import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface BottomNavProps {
  activeItem?: string;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeItem = "dashboard" }) => {
  const navigate = useNavigate();
  
  // Définir les éléments de navigation en fonction des routes disponibles
  const navItems: NavItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/dashboard",
      icon: (
        <svg className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: "match-analyse",
      label: "Analyse",
      path: "/dashboard/match-analyse",
      icon: (
        <svg className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      id: "coupon-du-jour",
      label: "Coupon du jours",
      path: "/dashboard/coupon-du-jour",
      icon: (
        <svg className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: "statistiques",
      label: "Stats",
      path: "/dashboard/statistiques",
      icon: (
        <svg className="h-6 w-6 mb-1" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      )
    }
  ];
  
  return (
    <div className="bg-blue-900 text-white grid grid-cols-4 p-4 fixed bottom-0 left-0 right-0 z-40">
      {navItems.map((item) => (
        <div
          key={item.id}
          onClick={() => navigate(item.path)}
          className={`flex flex-col items-center cursor-pointer ${
            activeItem === item.id ? 'text-blue-300' : ''
          }`}
        >
          {item.icon}
          <span className="text-xs">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default BottomNav;