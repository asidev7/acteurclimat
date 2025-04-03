import axios from 'axios';

// URL de base de l'API - à ajuster selon votre configuration
const API_BASE_URL = 'http://127.0.0.1:8000';

// Définition des types
export interface Bookmaker {
  id: number;
  name: string;
  logo: string | null;
  website: string | null;
}

export interface User {
  id: number;
  email: string;
  first_name: string | null;
  last_name: string | null;
  is_active: boolean;
  phone_number: string | null;
  profile_picture: string | null;
  coins: number;
  created_at: string;
}

export interface CouponSelection {
  id: number;
  match: string;
  pick: string;
  odds: number;
  result?: 'win' | 'loss' | 'pending' | null;
}

export interface DailyCoupon {
  id: number;
  date: string;
  title: string;
  description: string | null;
  image: string | null;
  bookmaker: Bookmaker | null;
  bookmaker_id: number | null;
  odds_value: number;
  risk_level: 'low' | 'medium' | 'high';
  required_plan: 'basic' | 'premium' | 'vip';
  is_validated: boolean | null;
  created_by: User;
  created_at: string;
  selections: CouponSelection[];
  is_accessible: string;
}

export interface CreateCouponDto {
  title: string;
  description?: string;
  bookmaker_id?: number;
  odds_value: number;
  risk_level: 'low' | 'medium' | 'high';
  required_plan: 'basic' | 'premium' | 'vip';
  selections: {
    match: string;
    pick: string;
    odds: number;
  }[];
}

export interface UpdateCouponDto {
  title?: string;
  description?: string;
  bookmaker_id?: number;
  odds_value?: number;
  risk_level?: 'low' | 'medium' | 'high';
  required_plan?: 'basic' | 'premium' | 'vip';
}

// Configuration des headers pour les requêtes authentifiées
const getAuthHeaders = () => {
  const token = localStorage.getItem('auth_token');
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  };
};

// Service pour les coupons
export const CouponService = {
  // Récupérer tous les coupons
  getAllCoupons: async (): Promise<DailyCoupon[]> => {
    try {
      const response = await axios.get<DailyCoupon[]>(`${API_BASE_URL}/coupons/`, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error('Error fetching coupons:', error);
      throw error;
    }
  },

  // Récupérer un coupon par son ID
  getCouponById: async (id: number): Promise<DailyCoupon> => {
    try {
      const response = await axios.get<DailyCoupon>(`${API_BASE_URL}/coupons/${id}/`, getAuthHeaders());
      return response.data;
    } catch (error) {
      console.error(`Error fetching coupon with ID ${id}:`, error);
      throw error;
    }
  },

  // Créer un nouveau coupon
  createCoupon: async (couponData: CreateCouponDto): Promise<DailyCoupon> => {
    try {
      const response = await axios.post<DailyCoupon>(
        `${API_BASE_URL}/coupons/create/`, 
        couponData, 
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error('Error creating coupon:', error);
      throw error;
    }
  },

  // Mettre à jour un coupon
  updateCoupon: async (id: number, couponData: UpdateCouponDto): Promise<DailyCoupon> => {
    try {
      const response = await axios.put<DailyCoupon>(
        `${API_BASE_URL}/coupons/${id}/update/`, 
        couponData, 
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating coupon with ID ${id}:`, error);
      throw error;
    }
  },

  // Mettre à jour partiellement un coupon
  patchCoupon: async (id: number, couponData: Partial<UpdateCouponDto>): Promise<DailyCoupon> => {
    try {
      const response = await axios.patch<DailyCoupon>(
        `${API_BASE_URL}/coupons/${id}/update/`, 
        couponData, 
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error(`Error patching coupon with ID ${id}:`, error);
      throw error;
    }
  },

  // Suivre un coupon
  followCoupon: async (id: number): Promise<any> => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/coupons/${id}/follow/`,
        {},
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      console.error(`Error following coupon with ID ${id}:`, error);
      throw error;
    }
  },

  // Filtrer les coupons par plan requis
  getCouponsByPlan: async (plan: 'basic' | 'premium' | 'vip'): Promise<DailyCoupon[]> => {
    try {
      const allCoupons = await CouponService.getAllCoupons();
      return allCoupons.filter(coupon => coupon.required_plan === plan);
    } catch (error) {
      console.error(`Error fetching coupons for plan ${plan}:`, error);
      throw error;
    }
  },

  // Filtrer les coupons par niveau de risque
  getCouponsByRiskLevel: async (riskLevel: 'low' | 'medium' | 'high'): Promise<DailyCoupon[]> => {
    try {
      const allCoupons = await CouponService.getAllCoupons();
      return allCoupons.filter(coupon => coupon.risk_level === riskLevel);
    } catch (error) {
      console.error(`Error fetching coupons for risk level ${riskLevel}:`, error);
      throw error;
    }
  },
  
  // Obtenir les coupons du jour
  getTodayCoupons: async (): Promise<DailyCoupon[]> => {
    try {
      const allCoupons = await CouponService.getAllCoupons();
      const today = new Date().toISOString().split('T')[0];
      return allCoupons.filter(coupon => coupon.date === today);
    } catch (error) {
      console.error('Error fetching today\'s coupons:', error);
      throw error;
    }
  },
  
  // Vérifier si un coupon est accessible pour l'utilisateur
  isAccessibleForCurrentUser: (coupon: DailyCoupon): boolean => {
    return coupon.is_accessible === 'true';
  }
};

export default CouponService;