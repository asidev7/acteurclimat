// src/services/ManageSubscribe.ts
import axios, { AxiosResponse } from 'axios';
import authService from './Auth';

// Définition des types
export interface SubscriptionPlan {
  id: number;
  name: string;
  plan_type: 'basic' | 'premium' | 'vip';
  price: number;
  duration_days: number;
  description: string;
  features: Record<string, any>;
  is_active: boolean;
}

export interface UserSubscription {
  id: number;
  user: number;
  plan: SubscriptionPlan;
  status: 'pending' | 'active' | 'canceled';
  reference_id: string;
  transaction_id?: string;
  invoice_token?: string;
  start_date: string;
  end_date?: string;
  is_active: boolean;
  auto_renew: boolean;
  days_remaining?: number;
}

export interface SubscriptionResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export interface PaymentResponse {
  payment_url: string;
  subscription_id: number;
}

const API_URL = 'http://localhost:8000';

class ManageSubscribe {
  /**
   * Récupère la liste des plans d'abonnement disponibles
   */
  async getPlans(): Promise<SubscriptionResponse> {
    try {
      const response: AxiosResponse<SubscriptionPlan[]> = await axios.get(
        `${API_URL}/api/subscription-plans/`
      );
      return { success: true, data: response.data };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Erreur lors du chargement des plans' 
      };
    }
  }

  /**
   * Récupère l'abonnement actuel de l'utilisateur connecté
   */
  async getCurrentSubscription(): Promise<SubscriptionResponse> {
    try {
      // Vérifier si l'utilisateur est connecté
      if (!authService.isAuthenticated()) {
        return { success: false, error: 'Utilisateur non connecté' };
      }

      const token = authService.getToken();
      
      const response: AxiosResponse<UserSubscription[]> = await axios.get(
        `${API_URL}/api/subscriptions/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Si l'utilisateur a des abonnements, prendre le premier actif
      const subscriptions = response.data;
      if (subscriptions && subscriptions.length > 0) {
        // Rechercher un abonnement actif
        const activeSubscription = subscriptions.find(sub => 
          sub.status === 'active' && sub.is_active
        );
        
        if (activeSubscription) {
          return { success: true, data: activeSubscription };
        } else {
          // Renvoyer le premier abonnement (même en attente ou annulé)
          return { success: true, data: subscriptions[0] };
        }
      }
      
      return { success: false, data: { message: 'Aucun abonnement trouvé' } };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Erreur lors du chargement de l\'abonnement' 
      };
    }
  }

  /**
   * Crée un nouvel abonnement pour l'utilisateur connecté
   * @param planId - ID du plan d'abonnement choisi
   * @param autoRenew - Activation du renouvellement automatique
   */
  async createSubscription(planId: number, autoRenew: boolean = false): Promise<SubscriptionResponse> {
    try {
      // Vérifier si l'utilisateur est connecté
      if (!authService.isAuthenticated()) {
        return { success: false, error: 'Utilisateur non connecté' };
      }

      const token = authService.getToken();
      
      const response: AxiosResponse<UserSubscription & { payment_url: string }> = await axios.post(
        `${API_URL}/api/subscriptions/`,
        { 
          plan: planId,
          auto_renew: autoRenew
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      return { success: true, data: response.data };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Erreur lors de la création de l\'abonnement' 
      };
    }
  }

  /**
   * Génère un lien de paiement pour un abonnement existant
   * @param subscriptionId - ID de l'abonnement
   */
  async getPaymentLink(subscriptionId: number): Promise<SubscriptionResponse> {
    try {
      // Vérifier si l'utilisateur est connecté
      if (!authService.isAuthenticated()) {
        return { success: false, error: 'Utilisateur non connecté' };
      }

      const token = authService.getToken();
      
      const response: AxiosResponse<PaymentResponse> = await axios.post(
        `${API_URL}/api/subscriptions/${subscriptionId}/initiate_payment/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      return { success: true, data: response.data };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Erreur lors de la génération du lien de paiement' 
      };
    }
  }

  /**
   * Active ou désactive le renouvellement automatique de l'abonnement
   * @param subscriptionId - ID de l'abonnement
   * @param autoRenew - Nouvelle valeur pour le renouvellement automatique
   */
  async updateAutoRenew(subscriptionId: number, autoRenew: boolean): Promise<SubscriptionResponse> {
    try {
      // Vérifier si l'utilisateur est connecté
      if (!authService.isAuthenticated()) {
        return { success: false, error: 'Utilisateur non connecté' };
      }

      const token = authService.getToken();
      
      const response: AxiosResponse<UserSubscription> = await axios.patch(
        `${API_URL}/api/subscriptions/${subscriptionId}/`,
        { auto_renew: autoRenew },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      return { success: true, data: response.data };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Erreur lors de la modification du renouvellement automatique' 
      };
    }
  }

  /**
   * Annule l'abonnement actuel de l'utilisateur
   * @param subscriptionId - ID de l'abonnement à annuler
   */
  async cancelSubscription(subscriptionId: number): Promise<SubscriptionResponse> {
    try {
      // Vérifier si l'utilisateur est connecté
      if (!authService.isAuthenticated()) {
        return { success: false, error: 'Utilisateur non connecté' };
      }

      const token = authService.getToken();
      
      const response: AxiosResponse<UserSubscription> = await axios.post(
        `${API_URL}/api/subscriptions/${subscriptionId}/cancel/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      return { success: true, data: response.data };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Erreur lors de l\'annulation de l\'abonnement' 
      };
    }
  }

  /**
   * Renouvelle un abonnement existant
   * @param subscriptionId - ID de l'abonnement à renouveler
   */
  async renewSubscription(subscriptionId: number): Promise<SubscriptionResponse> {
    try {
      // Vérifier si l'utilisateur est connecté
      if (!authService.isAuthenticated()) {
        return { success: false, error: 'Utilisateur non connecté' };
      }

      const token = authService.getToken();
      
      const response: AxiosResponse<PaymentResponse> = await axios.post(
        `${API_URL}/api/subscriptions/${subscriptionId}/renew/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      return { success: true, data: response.data };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Erreur lors du renouvellement de l\'abonnement' 
      };
    }
  }

  /**
   * Vérifie si un utilisateur a un abonnement actif
   */
  async hasActiveSubscription(): Promise<boolean> {
    const response = await this.getCurrentSubscription();
    return (
      response.success && 
      response.data && 
      response.data.status === 'active' && 
      response.data.is_active
    );
  }

  /**
   * Vérifie si l'utilisateur a accès à une fonctionnalité spécifique
   * @param featureName - Nom de la fonctionnalité à vérifier
   */
  async hasFeatureAccess(featureName: string): Promise<boolean> {
    const response = await this.getCurrentSubscription();
    
    if (
      response.success && 
      response.data && 
      response.data.status === 'active' && 
      response.data.is_active &&
      response.data.plan?.features
    ) {
      // Vérifie si la fonctionnalité existe dans le plan et est activée
      return !!response.data.plan.features[featureName];
    }
    
    return false;
  }

  /**
   * Vérifie le statut d'un paiement pour un abonnement spécifique
   * @param subscriptionId - ID de l'abonnement
   */
  async checkPaymentStatus(subscriptionId: number): Promise<SubscriptionResponse> {
    try {
      // Vérifier si l'utilisateur est connecté
      if (!authService.isAuthenticated()) {
        return { success: false, error: 'Utilisateur non connecté' };
      }

      const token = authService.getToken();
      
      const response: AxiosResponse<UserSubscription> = await axios.get(
        `${API_URL}/api/subscriptions/${subscriptionId}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      return { 
        success: true, 
        data: {
          status: response.data.status,
          is_active: response.data.is_active,
          transaction_id: response.data.transaction_id
        } 
      };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Erreur lors de la vérification du statut du paiement' 
      };
    }
  }
}

// Exporter une instance unique du service
export default new ManageSubscribe();