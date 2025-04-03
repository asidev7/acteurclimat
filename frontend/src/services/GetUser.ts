import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import authService from './Auth';

// Types
export interface UserPreferences {
  id?: number;
  receive_notifications: boolean;
  notification_time: string;
  favorite_bookmakers: number[];
  risk_preference: 'low' | 'medium' | 'high';
}

export interface UserStats {
  id?: number;
  total_coupons_followed: number;
  winning_coupons: number;
  losing_coupons: number;
  total_profit: number;
  success_rate: number;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface Transaction {
  id: number;
  transaction_type: 'subscription' | 'coins';
  amount: number;
  description: string;
  reference_id?: string;
  created_at: string;
}

export interface FollowedCoupon {
  id: number;
  coupon: number;
  stake: number;
  potential_winnings: number;
  followed_at: string;
  coupon_details?: any; // You might want to define a more specific type here
}

export interface DashboardData {
  user_stats: UserStats;
  recent_coupons: any[]; // You might want to define a more specific type
  notifications: Notification[];
  subscription_status: {
    is_active: boolean;
    plan_name?: string;
    days_remaining?: number;
  };
}

export interface UserError {
  detail?: string;
  [key: string]: string | string[] | undefined;
}

export class UserService {
  private apiClient: AxiosInstance;
  private readonly API_URL = 'http://127.0.0.1:8000';

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
        const token = authService.getToken();
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
            const refreshToken = authService.getRefreshToken();
            if (!refreshToken) {
              authService.logout();
              return Promise.reject(error);
            }
            
            const response = await axios.post(`${this.API_URL}/api/auth/token/refresh/`, {
              refresh: refreshToken
            });
            
            const { access } = response.data;
            authService.setToken(access);
            
            // Update Authorization header for original request
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${access}`;
            }
            
            return this.apiClient(originalRequest);
          } catch (refreshError) {
            authService.logout();
            return Promise.reject(refreshError);
          }
        }
        
        return Promise.reject(error);
      }
    );
  }

  // User profile methods
  public async getProfile(): Promise<User> {
    try {
      const response: AxiosResponse<User> = await this.apiClient.get('/api/users/profile/');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as UserError;
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
        throw error.response.data as UserError;
      }
      throw new Error('Une erreur s\'est produite lors de la mise à jour du profil');
    }
  }

  // User preferences methods
  public async getUserPreferences(): Promise<UserPreferences> {
    try {
      const response: AxiosResponse<UserPreferences> = await this.apiClient.get('/api/users/preferences/');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as UserError;
      }
      throw new Error('Une erreur s\'est produite lors de la récupération des préférences');
    }
  }

  public async updateUserPreferences(preferencesData: Partial<UserPreferences>): Promise<UserPreferences> {
    try {
      const response: AxiosResponse<UserPreferences> = await this.apiClient.put('/api/users/preferences/', preferencesData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as UserError;
      }
      throw new Error('Une erreur s\'est produite lors de la mise à jour des préférences');
    }
  }

  // User stats methods
  public async getUserStats(): Promise<UserStats> {
    try {
      const response: AxiosResponse<UserStats> = await this.apiClient.get('/api/users/stats/');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as UserError;
      }
      throw new Error('Une erreur s\'est produite lors de la récupération des statistiques');
    }
  }

  // Notifications methods
  public async getNotifications(): Promise<Notification[]> {
    try {
      const response: AxiosResponse<Notification[]> = await this.apiClient.get('/api/users/notifications/');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as UserError;
      }
      throw new Error('Une erreur s\'est produite lors de la récupération des notifications');
    }
  }

  public async markNotificationAsRead(notificationId: number): Promise<void> {
    try {
      await this.apiClient.put(`/api/users/notifications/${notificationId}/mark-read/`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as UserError;
      }
      throw new Error('Une erreur s\'est produite lors du marquage de la notification');
    }
  }

  // Dashboard data
  public async getDashboard(): Promise<DashboardData> {
    try {
      const response: AxiosResponse<DashboardData> = await this.apiClient.get('/api/users/dashboard/');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as UserError;
      }
      throw new Error('Une erreur s\'est produite lors de la récupération des données du tableau de bord');
    }
  }

  // Transactions history
  public async getTransactions(): Promise<Transaction[]> {
    try {
      const response: AxiosResponse<Transaction[]> = await this.apiClient.get('/api/users/transactions/');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as UserError;
      }
      throw new Error('Une erreur s\'est produite lors de la récupération des transactions');
    }
  }

  // Followed coupons
  public async getFollowedCoupons(): Promise<FollowedCoupon[]> {
    try {
      const response: AxiosResponse<FollowedCoupon[]> = await this.apiClient.get('/api/users/followed-coupons/');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as UserError;
      }
      throw new Error('Une erreur s\'est produite lors de la récupération des coupons suivis');
    }
  }

  // User CRUD methods (admin operations)
  public async getAllUsers(): Promise<User[]> {
    try {
      const response: AxiosResponse<User[]> = await this.apiClient.get('/api/users/');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as UserError;
      }
      throw new Error('Une erreur s\'est produite lors de la récupération des utilisateurs');
    }
  }

  public async getUserById(userId: number): Promise<User> {
    try {
      const response: AxiosResponse<User> = await this.apiClient.get(`/api/users/${userId}/`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as UserError;
      }
      throw new Error('Une erreur s\'est produite lors de la récupération de l\'utilisateur');
    }
  }

  public async createUser(userData: Partial<User>): Promise<User> {
    try {
      const response: AxiosResponse<User> = await this.apiClient.post('/api/users/', userData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as UserError;
      }
      throw new Error('Une erreur s\'est produite lors de la création de l\'utilisateur');
    }
  }

  public async updateUser(userId: number, userData: Partial<User>): Promise<User> {
    try {
      const response: AxiosResponse<User> = await this.apiClient.put(`/api/users/${userId}/`, userData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as UserError;
      }
      throw new Error('Une erreur s\'est produite lors de la mise à jour de l\'utilisateur');
    }
  }

  public async partialUpdateUser(userId: number, userData: Partial<User>): Promise<User> {
    try {
      const response: AxiosResponse<User> = await this.apiClient.patch(`/api/users/${userId}/`, userData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as UserError;
      }
      throw new Error('Une erreur s\'est produite lors de la mise à jour partielle de l\'utilisateur');
    }
  }

  public async deleteUser(userId: number): Promise<void> {
    try {
      await this.apiClient.delete(`/api/users/${userId}/`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data as UserError;
      }
      throw new Error('Une erreur s\'est produite lors de la suppression de l\'utilisateur');
    }
  }
}

// Import User type from AuthService
import { User } from './authService';

// Create a singleton instance
const userService = new UserService();
export default userService;

// Simple interface functions for direct use
export const getProfile = (): Promise<User> => userService.getProfile();
export const updateProfile = (profileData: Partial<User>): Promise<User> => userService.updateProfile(profileData);
export const getUserPreferences = (): Promise<UserPreferences> => userService.getUserPreferences();
export const updateUserPreferences = (preferencesData: Partial<UserPreferences>): Promise<UserPreferences> => 
  userService.updateUserPreferences(preferencesData);
export const getUserStats = (): Promise<UserStats> => userService.getUserStats();
export const getNotifications = (): Promise<Notification[]> => userService.getNotifications();
export const markNotificationAsRead = (notificationId: number): Promise<void> => userService.markNotificationAsRead(notificationId);
export const getDashboard = (): Promise<DashboardData> => userService.getDashboard();
export const getTransactions = (): Promise<Transaction[]> => userService.getTransactions();
export const getFollowedCoupons = (): Promise<FollowedCoupon[]> => userService.getFollowedCoupons();