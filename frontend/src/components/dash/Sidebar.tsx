// components/Sidebar.tsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiTrendingUp, 
  FiActivity, 
  FiCreditCard, 
  FiUser, 
  FiSettings, 
  FiPieChart, 
  FiList,
  FiX
} from 'react-icons/fi';
import authService, { User } from '../../services/Auth';
import UserProfile from './UserProfile';
import Logo from './Logo';

// Define menu structure
const menuItems = [
  { 
    name: 'Tableau de Bord', 
    icon: FiHome, 
    path: '/dashboard'
  },
  { 
    name: 'Analyse de Match', 
    icon: FiActivity, 
    path: '/dashboard/match-analyse'
  },
  { 
    name: 'Coupon du Jour', 
    icon: FiTrendingUp, 
    path: '/dashboard/coupon-du-jour'
  },
  { 
    name: 'Historique des Transactions', 
    icon: FiList, 
    path: '/dashboard/transactions'
  },
  { 
    name: 'Mes analyses', 
    icon: FiPieChart, 
    path: '/dashboard/statistiques'
  },
  { 
    name: 'Abonnements', 
    icon: FiCreditCard, 
    path: '/dashboard/abonnement'
  },
  { 
    name: 'Paramètres', 
    icon: FiSettings, 
    path: '/dashboard/parametres'
  }
];

interface SidebarProps {
  isMobile: boolean;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile, isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (authService.isAuthenticated()) {
          const user = await authService.getProfile();
          setCurrentUser(user);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Mobile sidebar component
  if (isMobile) {
    return (
      <div 
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black opacity-50"
          onClick={toggleSidebar}
        ></div>
        
        {/* Sidebar Content */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-72 bg-gradient-to-b from-blue-900 to-blue-700 
          text-white shadow-2xl transform transition-transform duration-300 ease-in-out"
        >
          {/* Header with Logo */}
          <div className="p-4 flex justify-between items-center border-b border-blue-800">
            <Logo variant="sidebar" />
            <button 
              onClick={toggleSidebar} 
              className="text-white hover:bg-blue-800 rounded-full p-2"
            >
              <FiX className="text-2xl" />
            </button>
          </div>
          
          {/* Navigation Items */}
          <div className="py-4 overflow-y-auto">
            <nav>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center py-3 px-4 transition-all duration-300 
                      ${isActive 
                        ? 'bg-white text-blue-900 font-semibold' 
                        : 'hover:bg-blue-800'
                      }`}
                    onClick={toggleSidebar}
                  >
                    <item.icon className={`mr-3 text-xl 
                      ${isActive ? 'text-blue-900' : 'text-blue-300'}`} 
                    />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
          
          {/* User Profile Section */}
          <UserProfile user={currentUser} variant="mobile" />
        </div>
      </div>
    );
  }
  
  // Desktop sidebar component
  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-blue-900 to-blue-700 text-white shadow-2xl w-72">
      <div className="p-5 border-b border-blue-800">
        <Logo variant="sidebar" />
      </div>
      
      <div className="flex-1 py-6 overflow-y-auto px-4 space-y-2">
        <nav>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center py-3 px-4 rounded-lg transition-all duration-300 group ${
                  isActive
                    ? 'bg-white text-blue-900 font-semibold shadow-lg'
                    : 'hover:bg-blue-800 hover:translate-x-2'
                }`}
              >
                <item.icon className={`mr-3 text-xl transform transition-transform group-hover:scale-110 ${
                  isActive ? 'text-blue-900' : 'text-blue-300'
                }`} />
                <span className="flex-1 text-sm">{item.name}</span>
                {!isActive && (
                  <span className="text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <UserProfile user={currentUser} variant="desktop" />
    </div>
  );
};

export default Sidebar;