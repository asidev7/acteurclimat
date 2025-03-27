// service/manageSubscribe.ts
import { getToken, refreshToken, logout } from './Auth';

const API_URL = 'https://api.iaparibot.pro';

interface Subscription {
  id: number;
  user: number;
  plan: number;
  status: 'active' | 'canceled' | 'expired' | 'pending';
  start_date: string;
  end_date: string;
  auto_renew?: boolean;
}

interface SubscriptionPlan {
  id: number;
  name: string;
  price: string;
  description: string;
  duration_in_days: number;
  features: Record<string, any>;
  is_active?: boolean;
}

interface ApiError extends Error {
  status?: number;
  data?: any;
}

async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  let token = getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  let response: Response;
  
  try {
    response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
      const newToken = await refreshToken();
      headers.Authorization = `Bearer ${newToken}`;
      response = await fetch(url, { ...options, headers });
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error: ApiError = new Error(errorData.message || 'Erreur de requête');
      error.status = response.status;
      error.data = errorData;
      throw error;
    }

    return response;
  } catch (error) {
    if ((error as ApiError).status === 401) {
      logout();
      window.location.href = '/login';
    }
    throw error;
  }
}

// Récupérer tous les abonnements de l'utilisateur
export const getUserSubscriptions = async (): Promise<Subscription[]> => {
  try {
    const response = await authFetch(`${API_URL}/subscriptions/`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching user subscriptions:', error);
    throw new Error('Impossible de récupérer les abonnements');
  }
};

// Récupérer les plans d'abonnement disponibles
export const getSubscriptionPlans = async (): Promise<SubscriptionPlan[]> => {
  try {
    const response = await fetch(`${API_URL}/subscription-plans/`);
    if (!response.ok) {
      throw new Error("Failed to fetch subscription plans");
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching subscription plans:', error);
    throw new Error('Impossible de récupérer les plans d\'abonnement');
  }
};

// Créer un nouvel abonnement
export const createSubscription = async (planId: number): Promise<Subscription> => {
  try {
    const response = await authFetch(`${API_URL}/subscriptions/`, {
      method: 'POST',
      body: JSON.stringify({ plan: planId }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw new Error('Échec de la création de l\'abonnement');
  }
};

// Annuler un abonnement
export const cancelSubscription = async (subscriptionId: number): Promise<void> => {
  try {
    await authFetch(`${API_URL}/subscriptions/${subscriptionId}/cancel/`, {
      method: 'POST',
    });
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw new Error('Échec de l\'annulation de l\'abonnement');
  }
};

// Changer de plan d'abonnement
export const changeSubscriptionPlan = async (
  subscriptionId: number,
  newPlanId: number
): Promise<Subscription> => {
  try {
    const response = await authFetch(`${API_URL}/subscriptions/${subscriptionId}/change_plan/`, {
      method: 'POST',
      body: JSON.stringify({ plan: newPlanId }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error changing subscription plan:', error);
    throw new Error('Échec du changement de plan');
  }
};

// Vérifier le statut d'un abonnement
export const checkSubscriptionStatus = async (
  subscriptionId: number
): Promise<{ status: string; message?: string }> => {
  try {
    const response = await authFetch(`${API_URL}/subscriptions/${subscriptionId}/check_status/`);
    return await response.json();
  } catch (error) {
    console.error('Error checking subscription status:', error);
    throw new Error('Échec de la vérification du statut');
  }
};

// Renouveler un abonnement
export const renewSubscription = async (subscriptionId: number): Promise<Subscription> => {
  try {
    const response = await authFetch(`${API_URL}/subscriptions/${subscriptionId}/renew/`, {
      method: 'POST',
    });
    return await response.json();
  } catch (error) {
    console.error('Error renewing subscription:', error);
    throw new Error('Échec du renouvellement de l\'abonnement');
  }
};

// Mettre à jour un abonnement (PUT)
export const updateSubscription = async (
  subscriptionId: number,
  data: Partial<Subscription>
): Promise<Subscription> => {
  try {
    const response = await authFetch(`${API_URL}/subscriptions/${subscriptionId}/`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw new Error('Échec de la mise à jour de l\'abonnement');
  }
};

// Fonction pour vérifier le statut d'un abonnement pour l'utilisateur connecté
export const checkUserSubscriptionStatus = async (): Promise<{ 
  status: string; 
  subscription?: Subscription;
  message?: string;
}> => {
  try {
    const subscriptions = await getUserSubscriptions();
    
    if (subscriptions.length === 0) {
      return { 
        status: 'no_subscription',
        message: 'Aucun abonnement trouvé pour cet utilisateur' 
      };
    }

    // Trier par date de fin décroissante pour obtenir le plus récent
    const sortedSubscriptions = [...subscriptions].sort(
      (a, b) => new Date(b.end_date).getTime() - new Date(a.end_date).getTime()
    );

    const latestSubscription = sortedSubscriptions[0];
    const statusResponse = await checkSubscriptionStatus(latestSubscription.id);
    
    return {
      ...statusResponse,
      subscription: latestSubscription
    };
  } catch (error) {
    console.error('Erreur lors de la vérification du statut de l\'abonnement:', error);
    return {
      status: 'error',
      message: 'Erreur lors de la vérification du statut de l\'abonnement'
    };
  }
};