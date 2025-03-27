import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/dash/Header';
import Sidebar from '../components/dash/Sidebar';
import { ThemeContext } from '../components/dash/Header';

// Define an interface for the theme context value
interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Theme context value
  const themeContextValue: ThemeContextType = {
    darkMode,
    toggleDarkMode
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <div className={`flex h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-300`}>
        <Sidebar 
          sidebarOpen={sidebarOpen} 
          toggleSidebar={toggleSidebar} 
          darkMode={darkMode} 
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            sidebarOpen={sidebarOpen} 
            toggleSidebar={toggleSidebar} 
          />
          <main 
            className={`
              flex-1 
              overflow-y-auto 
              p-6 
              ${darkMode 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-100 text-gray-800'
              } 
              transition-colors 
              duration-300
            `}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default DashboardLayout;