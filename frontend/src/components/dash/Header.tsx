import React, { useContext } from 'react';
import { UserIcon, BellIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

// Contexte pour gérer le thème
export const ThemeContext = React.createContext({
  darkMode: false,
  toggleDarkMode: () => {}
});

interface HeaderProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, toggleSidebar }) => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  
  // Données utilisateur simulées
  
  
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };
  
  return (
    <header className={`${darkMode ? 'bg-gray-800 text-white p-3' : 'bg-white text-gray-800'} shadow-md transition-colors duration-300`}>
      <div className="flex items-center justify-between px-4 py-3">
        {/* Bouton pour mobile qui remplace le sidebar toggle */}
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className={`mr-3 p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} lg:hidden transition-colors`}
            aria-label={sidebarOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {sidebarOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
          
          <h2 className="text-xl font-semibold transition-all duration-300">
            Dashboard
          </h2>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Bouton mode sombre */}
          <button 
            onClick={toggleDarkMode} 
            className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700 text-yellow-400' : 'hover:bg-gray-100 text-gray-600'} transition-colors`}
            aria-label={darkMode ? "Passer au mode clair" : "Passer au mode sombre"}
          >
            {darkMode ? (
              <SunIcon className="h-6 w-6" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            )}
          </button>
          
          {/* Notifications */}
          <button 
            className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} relative transition-colors`}
            aria-label="Notifications"
          >
            <BellIcon className={`h-6 w-6 ${darkMode ? 'text-gray-200' : 'text-gray-600'}`} />
            <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              3
            </span>
          </button>
          
          {/* Infos utilisateur - caché sur mobile */}
          
         
        </div>
      </div>
    </header>
  );
};

export default Header;