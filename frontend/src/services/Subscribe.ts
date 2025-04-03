import axios, { AxiosError, AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';

// Types
export interface SubscriptionPlan {
  id: number;
  name: string;
  price: number;
  description: string;
  duration_in_days: number;
  features: any[];
}

export interface Subscription {
  id: number;
  user: number;
  plan: number;
  plan_details: SubscriptionPlan;
  start_date: string;
  end_date: string;
  status: 'active' | 'expired' | 'pending' | 'cancelled';
  days_remaining: number;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionCreateData {
  plan: number;
}

export interface SubscriptionChangePlanData {
  new_plan: number;
}

// Configuration
const API_CONFIG = {
  BASE_URL: 'http://127.0.0.1:8000',
  TOKEN_KEY: 'auth_token',
  REFRESH_TOKEN_KEY: 'refresh_token',
  USER_KEY: 'user_data'
};

// Error messages
const ERROR_MESSAGES = {
  FETCH_SUBSCRIPTIONS: 'Une erreur s\'est produite lors de la récupération des abonnements',
  CREATE_SUBSCRIPTION: 'Une erreur s\'est produite lors de la création de l\'abonnement',
  GET_SUBSCRIPTION: 'Une erreur s\'est produite lors de la récupération de l\'abonnement',
  UPDATE_SUBSCRIPTION: 'Une erreur s\'est produite lors de la mise à jour de l\'abonnement',
  PARTIAL_UPDATE: 'Une erreur s\'est produite lors de la mise à jour partielle de l\'abonnement',
  DELETE_SUBSCRIPTION: 'Une erreur s\'est produite lors de la suppression de l\'abonnement',
  CANCEL_SUBSCRIPTION: 'Une erreur s\'est produite lors de l\'annulation de l\'abonnement',
  CHANGE_PLAN: 'Une erreur s\'est produite lors du changement de plan',
  CHECK_STATUS: 'Une erreur s\'est produite lors de la vérification du statut de l\'abonnement',
  RENEW_SUBSCRIPTION: 'Une erreur s\'est produite lors du renouvellement de l\'abonnement',
  CURRENT_SUBSCRIPTION: 'Une erreur s\'est produite lors de la récupération de l\'abonnement actuel',
  NETWORK_ERROR: 'Erreur de connexion au serveur. Veuillez vérifier votre connexion internet.'
};

/**
 * Service d'authentification et d'abonnement
 */
export class AuthService {
  private apiClient: AxiosInstance;
  private readonly API_URL = API_CONFIG.BASE_URL;
  private readonly TOKEN_KEY = API_CONFIG.TOKEN_KEY;
  private readonly REFRESH_TOKEN_KEY = API_CONFIG.REFRESH_TOKEN_KEY;
  private readonly USER_KEY = API_CONFIG.USER_KEY;
  private refreshTokenPromise: Promise<string> | null = null;

  constructor() {
    this.apiClient = this.createAxiosInstance();
    this.setupInterceptors();
  }

  /**
   * Crée une instance Axios avec la configuration de base
   */
  private createAxiosInstance(): AxiosInstance {
    return axios.create({
      baseURL: this.API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000 // Timeout de 10 secondes
    });
  }

  /**
   * Configure les intercepteurs pour les requêtes et les réponses
   */
  private setupInterceptors(): void {
    // Intercepteur pour les requêtes
    this.apiClient.interceptors.request.use(
      this.handleRequestSuccess.bind(this),
      this.handleRequestError.bind(this)
    );

    // Intercepteur pour les réponses
    this.apiClient.interceptors.response.use(
      this.handleResponseSuccess.bind(this),
      this.handleResponseError.bind(this)
    );
  }

  /**
   * Gère les requêtes réussies en ajoutant le token d'authentification
   */
  private handleRequestSuccess(config: AxiosRequestConfig): AxiosRequestConfig {
    const token = this.getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }

  /**
   * Gère les erreurs de requêtes
   */
  private handleRequestError(error: any): Promise<never> {
    return Promise.reject(error);
  }

  /**
   * Gère les réponses réussies
   */
  private handleResponseSuccess(response: AxiosResponse): AxiosResponse {
    return response;
  }

  /**
   * Gère les erreurs de réponses, y compris le renouvellement automatique du token
   */
  private async handleResponseError(error: AxiosError): Promise<any> {
    // Vérifier si l'erreur est due à une coupure réseau
    if (!error.response) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }

    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    
    // Si erreur 401 et nous n'avons pas encore essayé de rafraîchir le token
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      if (!this.refreshTokenPromise) {
        this.refreshTokenPromise = this.refreshAuthToken();
      }

      try {
        // Attendre que le token soit rafraîchi
        const newToken = await this.refreshTokenPromise;
        
        // Mettre à jour l'en-tête d'autorisation pour la requête originale
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        
        // Marquer la requête comme ayant été retentée
        originalRequest._retry = true;
        
        // Réessayer la requête originale avec le nouveau token
        return this.apiClient(originalRequest);
      } catch (refreshError) {
        // Si le rafraîchissement échoue, déconnecter l'utilisateur
        this.logout();
        throw refreshError;
      } finally {
        this.refreshTokenPromise = null;
      }
    }
    
    // Gérer d'autres types d'erreurs
    if (error.response?.data) {
      throw error.response.data;
    }
    
    throw error;
  }

  /**
   * Rafraîchit le token d'authentification
   */
  private async refreshAuthToken(): Promise<string> {
    const refreshToken = this.getRefreshToken();
    
    if (!refreshToken) {
      this.logout();
      throw new Error('Votre session a expiré. Veuillez vous reconnecter.');
    }
    
    try {
      const response = await axios.post(`${this.API_URL}/token/refresh/`, {
        refresh: refreshToken
      });
      
      const { access } = response.data;
      this.setToken(access);
      
      return access;
    } catch (error) {
      this.logout();
      throw new Error('Impossible de renouveler votre session. Veuillez vous reconnecter.');
    }
  }

  /**
   * Méthode générique pour gérer les erreurs de requêtes HTTP
   */
  private handleError(error: any, defaultMessage: string): never {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
      }
      throw error.response.data;
    }
    throw error instanceof Error ? error : new Error(defaultMessage);
  }

  // ---------------------------------------------------------------------------
  // Méthodes de gestion des tokens et de l'authentification
  // ---------------------------------------------------------------------------

  /**
   * Récupère le token d'authentification depuis le stockage local
   */
  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Enregistre le token d'authentification dans le stockage local
   */
  public setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * Récupère le token de rafraîchissement depuis le stockage local
   */
  public getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Enregistre le token de rafraîchissement dans le stockage local
   */
  public setRefreshToken(token: string): void {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  /**
   * Vérifie si l'utilisateur est authentifié
   */
  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Déconnecte l'utilisateur en supprimant les tokens
   */
  public logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    // Émettre un événement de déconnexion pour que l'application puisse réagir
    window.dispatchEvent(new Event('auth:logout'));
  }

  /**
   * Sauvegarde les données utilisateur dans le stockage local
   */
  public saveUserData(userData: any): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
  }

  /**
   * Récupère les données utilisateur depuis le stockage local
   */
  public getUserData(): any | null {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  // ---------------------------------------------------------------------------
  // Méthodes de gestion des abonnements
  // ---------------------------------------------------------------------------

  /**
   * Récupère tous les abonnements
   */
  public async getSubscriptions(): Promise<Subscription[]> {
    try {
      const response: AxiosResponse<Subscription[]> = await this.apiClient.get('/subscriptions/');
      return response.data;
    } catch (error) {
      this.handleError(error, ERROR_MESSAGES.FETCH_SUBSCRIPTIONS);
    }
  }

  /**
   * Crée un nouvel abonnement
   */
  public async createSubscription(data: SubscriptionCreateData): Promise<Subscription> {
    try {
      const response: AxiosResponse<Subscription> = await this.apiClient.post('/subscriptions/', data);
      return response.data;
    } catch (error) {
      this.handleError(error, ERROR_MESSAGES.CREATE_SUBSCRIPTION);
    }
  }

  /**
   * Récupère un abonnement spécifique par ID
   */
  public async getSubscription(id: number): Promise<Subscription> {
    try {
      const response: AxiosResponse<Subscription> = await this.apiClient.get(`/subscriptions/${id}/`);
      return response.data;
    } catch (error) {
      this.handleError(error, ERROR_MESSAGES.GET_SUBSCRIPTION);
    }
  }

  /**
   * Met à jour un abonnement
   */
  public async updateSubscription(id: number, data: Partial<Subscription>): Promise<Subscription> {
    try {
      const response: AxiosResponse<Subscription> = await this.apiClient.put(`/subscriptions/${id}/`, data);
      return response.data;
    } catch (error) {
      this.handleError(error, ERROR_MESSAGES.UPDATE_SUBSCRIPTION);
    }
  }

  /**
   * Mise à jour partielle d'un abonnement
   */
  public async partialUpdateSubscription(id: number, data: Partial<Subscription>): Promise<Subscription> {
    try {
      const response: AxiosResponse<Subscription> = await this.apiClient.patch(`/subscriptions/${id}/`, data);
      return response.data;
    } catch (error) {
      this.handleError(error, ERROR_MESSAGES.PARTIAL_UPDATE);
    }
  }

  /**
   * Supprime un abonnement
   */
  public async deleteSubscription(id: number): Promise<void> {
    try {
      await this.apiClient.delete(`/subscriptions/${id}/`);
    } catch (error) {
      this.handleError(error, ERROR_MESSAGES.DELETE_SUBSCRIPTION);
    }
  }

  /**
   * Annule un abonnement
   */
  public async cancelSubscription(id: number): Promise<Subscription> {
    try {
      const response: AxiosResponse<Subscription> = await this.apiClient.post(`/subscriptions/${id}/cancel/`);
      return response.data;
    } catch (error) {
      this.handleError(error, ERROR_MESSAGES.CANCEL_SUBSCRIPTION);
    }
  }

  /**
   * Change le plan d'abonnement
   */
  public async changePlan(id: number, data: SubscriptionChangePlanData): Promise<Subscription> {
    try {
      const response: AxiosResponse<Subscription> = await this.apiClient.post(`/subscriptions/${id}/change_plan/`, data);
      return response.data;
    } catch (error) {
      this.handleError(error, ERROR_MESSAGES.CHANGE_PLAN);
    }
  }

  /**
   * Vérifie le statut d'un abonnement
   */
  public async checkUserSubscriptionStatus(id: number): Promise<Subscription> {
    try {
      const response: AxiosResponse<Subscription> = await this.apiClient.get(`/subscriptions/${id}/check_status/`);
      return response.data;
    } catch (error) {
      this.handleError(error, ERROR_MESSAGES.CHECK_STATUS);
    }
  }

  /**
   * Renouvelle un abonnement
   */
  public async renewSubscription(id: number): Promise<Subscription> {
    try {
      const response: AxiosResponse<Subscription> = await this.apiClient.post(`/subscriptions/${id}/renew/`);
      return response.data;
    } catch (error) {
      this.handleError(error, ERROR_MESSAGES.RENEW_SUBSCRIPTION);
    }
  }

  /**
   * Récupère l'abonnement actif de l'utilisateur courant (s'il existe)
   */
  public async getCurrentSubscription(): Promise<Subscription | null> {
    try {
      // Récupérer tous les abonnements et filtrer pour trouver l'actif
      const subscriptions = await this.getSubscriptions();
      return subscriptions.find(sub => sub.status === 'active') || null;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'abonnement actuel:', error);
      return null;
    }
  }

  /**
   * Vérifie si l'utilisateur a un abonnement actif
   */
  public async hasActiveSubscription(): Promise<boolean> {
    const subscription = await this.getCurrentSubscription();
    return subscription !== null && subscription.status === 'active';
  }

  /**
   * Récupère les jours restants de l'abonnement actif
   */
  public async getRemainingDays(): Promise<number | null> {
    const subscription = await this.getCurrentSubscription();
    return subscription ? subscription.days_remaining : null;
  }
}

// Instance unique du service d'authentification
const authService = new AuthService();

// ---------------------------------------------------------------------------
// Fonctions exportées pour un accès facile
// ---------------------------------------------------------------------------

// Authentification
export const isAuthenticated = (): boolean => authService.isAuthenticated();
export const logout = (): void => authService.logout();
export const getUserData = (): any => authService.getUserData();

// Abonnements
export const getSubscriptions = (): Promise<Subscription[]> => authService.getSubscriptions();
export const createSubscription = (data: SubscriptionCreateData): Promise<Subscription> => 
  authService.createSubscription(data);
export const getSubscription = (id: number): Promise<Subscription> => 
  authService.getSubscription(id);
export const updateSubscription = (id: number, data: Partial<Subscription>): Promise<Subscription> => 
  authService.updateSubscription(id, data);
export const partialUpdateSubscription = (id: number, data: Partial<Subscription>): Promise<Subscription> => 
  authService.partialUpdateSubscription(id, data);
export const deleteSubscription = (id: number): Promise<void> => 
  authService.deleteSubscription(id);
export const cancelSubscription = (id: number): Promise<Subscription> => 
  authService.cancelSubscription(id);
export const changePlan = (id: number, data: SubscriptionChangePlanData): Promise<Subscription> => 
  authService.changePlan(id, data);
export const checkSubscriptionStatus = (id: number): Promise<Subscription> => 
  authService.checkUserSubscriptionStatus(id);
export const renewSubscription = (id: number): Promise<Subscription> => 
  authService.renewSubscription(id);
export const getCurrentSubscription = (): Promise<Subscription | null> => 
  authService.getCurrentSubscription();
export const hasActiveSubscription = (): Promise<boolean> => 
  authService.hasActiveSubscription();
export const getRemainingDays = (): Promise<number | null> => 
  authService.getRemainingDays();

export default authService;