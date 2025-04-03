// pages/DashboardPage.tsx
import React from 'react';
import MainLayout from '../../layouts/DashboardLayout';

const DashboardPage: React.FC = () => {
  return (
    <MainLayout 
      title="Dashboard" 
      activeNav="home" 
      contentTitle="Tableau de bord"
    >
      {/* Contenu du tableau de bord */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-medium mb-2">Statistiques</h3>
          <p>Contenu des statistiques...</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-medium mb-2">Activité récente</h3>
          <p>Liste d'activités...</p>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="font-medium mb-2">Graphique de performance</h3>
        <div className="h-48 bg-gray-100 flex items-center justify-center">
          [Graphique ici]
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;