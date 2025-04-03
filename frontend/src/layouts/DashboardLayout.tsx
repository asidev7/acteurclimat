// components/MainLayout.tsx
import React, { ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/dash/Header';
import BottomNav from '../components/dash/BottomNav';
import ContentContainer from '../components/dash/ContentContainer';
import authService from '../services/Auth'; // uthAdjust path as needed

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  activeNav?: string;
  contentTitle?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title = "Dashboard",
  activeNav = "home",
  contentTitle
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Check if user is authenticated
    if (!authService.isAuthenticated()) {
      // Redirect to login page if not authenticated
      navigate('/connexion', { 
        state: { from: location.pathname } 
      });
    }
  }, [navigate, location]);

  // Don't render content until authentication check is complete
  if (!authService.isAuthenticated()) {
    return null; // Or a loading spinner
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title={title} />
      
      <main className="flex-grow">
        <ContentContainer title={contentTitle}>
          {children}
        </ContentContainer>
      </main>
      
      <BottomNav active={activeNav} />
    </div>
  );
};

export default MainLayout;