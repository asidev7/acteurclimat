import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FiHome, FiBarChart2, FiCalendar, FiCreditCard,
  FiTrendingUp, FiUser, FiSettings, FiShare2, FiMenu, FiLogOut
} from 'react-icons/fi';
import authService, { User, logout } from '../../services/Auth';
import { checkUserSubscriptionStatus, Subscription } from '../../services/manageSubscribe';

interface MenuItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  badge?: string;
  requiresPremium?: boolean;
}

const Sider = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isMobile, setIsMobile] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState<{
    status: string;
    subscription?: Subscription;
    message?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        if (authService.isAuthenticated()) {
          const user = await authService.getProfile();
          setCurrentUser(user);
          
          const status = await checkUserSubscriptionStatus();
          setSubscriptionStatus(status);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const menuItems: MenuItem[] = [
    { 
      name: 'Tableau de Bord', 
      icon: FiHome, 
      path: '/dashboard'
    },
    { 
      name: 'Analyses', 
      icon: FiBarChart2, 
      path: '/dashboard/analyse'
    },
    { 
      name: 'Matchs', 
      icon: FiCalendar, 
      path: '/dashboard/matchs'
    },
    { 
      name: 'Abonnements', 
      icon: FiCreditCard, 
      path: '/dashboard/abonnement',
      badge: subscriptionStatus?.subscription ? 'Premium' : 'Basic'
    },
    { 
      name: 'Paramètres', 
      icon: FiSettings, 
      path: '/dashboard/setting'
    },
    { 
      name: 'Partages', 
      icon: FiShare2, 
      path: '/dashboard/shares', 
      requiresPremium: true
    },
    { 
      name: 'Communauté', 
      icon: FiTrendingUp, 
      path: 'https://t.me/'
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const MobileBottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1a3a8f] border-t border-blue-800 z-50">
      <div className="grid grid-cols-5 gap-1 py-3">
        {menuItems.slice(0, 5).map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 ${
                isActive ? 'text-white' : 'text-blue-200'
              }`}
            >
              <item.icon className="text-xl" />
              <span className="text-xs mt-1">{item.name.split(' ')[0]}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );

  const ProfileDropdownMenu = () => (
    <div 
      className={`absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 z-50 overflow-hidden ${
        isProfileMenuOpen ? 'block' : 'hidden'
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="py-1">
        {[
          { name: 'Profil', icon: FiUser, path: '/dashboard/setting' },
          { name: 'Paramètres', icon: FiSettings, path: '/dashboard/setting' },
          { name: 'Abonnements', icon: FiCreditCard, path: '/dashboard/abonnement' },
        ].map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsProfileMenuOpen(false)}
          >
            <item.icon className="mr-3 text-gray-500" />
            {item.name}
          </Link>
        ))}
        <div className="border-t border-gray-200 my-1"></div>
        <button 
          onClick={handleLogout}
          className="w-full text-left flex items-center px-4 py-3 text-sm text-red-600 hover:bg-gray-100"
        >
          <FiLogOut className="mr-3" /> Déconnexion
        </button>
      </div>
    </div>
  );

  const MobileHeader = () => (
    <div className="fixed top-0 left-0 right-0 bg-[#1a3a8f] text-white p-4 flex justify-between items-center z-50">
      <div className="flex items-center space-x-3">
        <div className="relative w-10 h-10 bg-white rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-[#1a3a8f] opacity-90 flex items-center justify-center">
            <span className="text-white font-bold">IA</span>
          </div>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-wider">IA Paribot</h1>
        </div>
      </div>
      
      <div className="relative">
        <button 
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} 
          className="text-white text-2xl focus:outline-none"
        >
          {currentUser?.avatar ? (
            <img 
              src={currentUser.avatar} 
              alt="Profile" 
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <FiUser />
          )}
        </button>
        <ProfileDropdownMenu />
      </div>
    </div>
  );

  const DesktopSidebar = () => (
    <div className="h-screen flex flex-col bg-[#1a3a8f] text-white shadow-lg w-72">
      <div className="p-5 border-b border-blue-800 flex items-center space-x-3">
        <div className="relative w-10 h-10 bg-white rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-[#1a3a8f] opacity-90 flex items-center justify-center">
            <span className="text-white font-bold">IA</span>
          </div>
        </div>
        <h1 className="text-xl font-bold tracking-wider">IA Paribot</h1>
      </div>
      
      <div className="flex-1 py-6 overflow-y-auto px-4 space-y-2">
        <nav>
          {menuItems.filter(item => 
            !item.requiresPremium || subscriptionStatus?.status === 'active'
          ).map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center py-3 px-4 rounded-lg ${
                  isActive
                    ? 'bg-white text-[#1a3a8f] font-medium'
                    : 'hover:bg-blue-700'
                }`}
              >
                <item.icon className={`mr-3 text-xl ${
                  isActive ? 'text-[#1a3a8f]' : 'text-white'
                }`} />
                <span className="flex-1 text-sm">{item.name}</span>
                
                {item.badge && (
                  <span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${
                    item.badge === 'Premium' ? 'bg-purple-500' : 'bg-blue-500'
                  } text-white`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t border-blue-800">
        <div className="flex items-center">
          {currentUser?.avatar ? (
            <img 
              src={currentUser.avatar} 
              alt="Profile" 
              className="w-10 h-10 rounded-full mr-3"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center mr-3">
              <FiUser className="text-white" />
            </div>
          )}
          <div>
            <div className="text-sm font-medium text-white truncate max-w-[120px]">
              {currentUser?.first_name && currentUser?.last_name 
                ? `${currentUser.first_name} ${currentUser.last_name}`
                : currentUser?.username || 'Utilisateur'}
            </div>
            <div className="text-xs text-blue-200">
              {subscriptionStatus?.subscription ? 'Premium' : 'Basic'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isMobile ? (
        <>
          <MobileHeader />
          <MobileBottomNav />
          <div className="pt-16 pb-20"></div>
        </>
      ) : (
        <DesktopSidebar />
      )}
    </>
  );
};

export default Sider;