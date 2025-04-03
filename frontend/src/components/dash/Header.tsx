import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo1.png';
import authService, { User } from '../../services/Auth'; // Adjust path as needed

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "Dashboard" }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (authService.isAuthenticated()) {
        try {
          const userData = await authService.getProfile();
          setUser(userData);
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
        }
      }
    };

    fetchUserProfile();
  }, []);

  const getInitials = (user: User): string => {
    const firstInitial = user.first_name ? user.first_name.charAt(0).toUpperCase() : '';
    const lastInitial = user.last_name ? user.last_name.charAt(0).toUpperCase() : '';
    
    if (firstInitial && lastInitial) {
      return `${firstInitial}${lastInitial}`;
    } else if (firstInitial) {
      return firstInitial;
    } else if (user.username) {
      return user.username.charAt(0).toUpperCase();
    }
    
    return user.email.charAt(0).toUpperCase();
  };

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login'; // Redirect to login page
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-blue-900 text-white p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-40">
      <div className="flex items-center space-x-3">
        <img
          src={logo}
          alt="Logo"
          className="w-10 h-10 rounded-xl object-cover"
        />
        <div>
          <h1 className="text-xl font-bold tracking-wide">
            {title}
            <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full align-middle">
              PRO
            </span>
          </h1>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        {user ? (
          <div className="relative">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={toggleDropdown}>
              <span className="hidden md:block text-sm">{user.email}</span>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                {getInitials(user)}
              </div>
            </div>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <a href="/dashboard/abonnement" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Mon Compte
                </a>
                <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profile
                </a>
                <a href="/dashboard/parametres" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Settings
                </a>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <a href="/connexion" className="text-sm bg-blue-600 px-3 py-1 rounded-md">
            Connexion
          </a>
        )}
        
        <button className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-white">
          ?
        </button>
      </div>
    </header>
  );
};

export default Header;