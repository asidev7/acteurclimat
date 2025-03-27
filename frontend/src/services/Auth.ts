import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

// Types
export interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  first_name?: string;
  last_name?: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface AuthError {
  detail?: string;
  email?: string[];
  username?: string[];
  password?: string[];
  non_field_errors?: string[];
  [key: string]: string | string[] | undefined;
}

export class AuthService {
  private apiClient: AxiosInstance;
  private readonly API_URL = 'http://127.0.0.1:8000';
  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';

  constructor() {
    this.apiClient = axios.create({
      baseURL: this.API_URL,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    // Add request interceptor to include auth token
    this.apiClient.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor to handle token refresh
    this.apiClient.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config;
        
        // If error is 401 and we haven't tried to refresh token yet
        if (error.response?.status === 401 && originalRequest && !('_retry' in originalRequest)) {
          // Add _retry property to originalRequest
          Object.defineProperty(originalRequest, '_retry', { value: true });
          
          try {
            const refreshToken = this.getRefreshToken();
            if (!refreshToken) {
              this.logout();
              return Promise.reject(error);
            }
            
            const response = await axios.post(`${this.API_URL}/token/refresh/`, {
              refresh: refreshToken
            });
            
            const { access } = response.data;
            this.setToken(access);
            
            // Update Authorization header for original request
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${access}`;
            }
            
            return this.apiClient(originalRequest);
          } catch (refreshError) {
            this.logout();
            return Promise.reject(refreshError);
          }
        }
        
        return Promise.reject(error);
      }
    );
  }

  // Helper methods for token management
  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  public setRefreshToken(token: string): void {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Auth API methods
  public async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response: AxiosResponse<AuthResponse> = await this.apiClient.post('/login/', {
        email: credentials.email,
        password: credentials.password
      });
      
      this.setToken(response.data.access);
      this.setRefreshToken(response.data.refresh);
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as AuthError;
      }
      throw new Error('Une erreur s\'est produite lors de la connexion');
    }
  }

  public async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response: AxiosResponse<AuthResponse> = await this.apiClient.post('/register/', userData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as AuthError;
      }
      throw new Error('Une erreur s\'est produite lors de l\'inscription');
    }
  }

  public async verifyEmail(token: string): Promise<void> {
    try {
      await this.apiClient.get(`/api/users/verify-email/?token=${token}`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as AuthError;
      }
      throw new Error('Une erreur s\'est produite lors de la vérification de l\'email');
    }
  }

  public async getProfile(): Promise<User> {
    try {
      const response: AxiosResponse<User> = await this.apiClient.get('/api/users/profile/');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as AuthError;
      }
      throw new Error('Une erreur s\'est produite lors de la récupération du profil');
    }
  }

  public async updateProfile(profileData: Partial<User>): Promise<User> {
    try {
      const response: AxiosResponse<User> = await this.apiClient.put('/api/users/profile/', profileData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as AuthError;
      }
      throw new Error('Une erreur s\'est produite lors de la mise à jour du profil');
    }
  }

  public async requestPasswordReset(email: string): Promise<void> {
    try {
      await this.apiClient.post('/api/users/reset-password/', { email });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as AuthError;
      }
      throw new Error('Une erreur s\'est produite lors de la demande de réinitialisation du mot de passe');
    }
  }

  public async resetPassword(token: string, password: string, confirmPassword: string): Promise<void> {
    try {
      await this.apiClient.post('/api/users/reset-password/confirm/', {
        token,
        password,
        password_confirm: confirmPassword
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as AuthError;
      }
      throw new Error('Une erreur s\'est produite lors de la réinitialisation du mot de passe');
    }
  }

  public logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    
    // Redirect to login page (can be handled by the calling component)
    // window.location.href = '/login';
  }
}


// Fonctions d'interface simplifiée
export const getToken = (): string | null => authService.getToken();

export const logout = (): void => authService.logout();

export const refreshToken = async (): Promise<void> => {
  const refreshToken = authService.getRefreshToken();
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }
  
  try {
    const response = await axios.post(`${authService.API_URL}/token/refresh/`, {
      refresh: refreshToken
    });
    
    authService.setToken(response.data.access);
  } catch (error) {
    authService.logout();
    throw error;
  }
};


// Create a singleton instance
const authService = new AuthService();
export default authService;