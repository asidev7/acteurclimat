import React, { useState } from 'react';
import { 
  TrophyIcon, 
  ChartBarIcon, 
  CurrencyEuroIcon, 
  FireIcon,
  ShieldCheckIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';

const Dashboard: React.FC = () => {
  const [isProfilOptimized, setIsProfilOptimized] = useState(false);

  // Statistiques du jour (à remplacer par des données réelles)
  const dailyStats = {
    totalParisAnalyses: 0,
    gainPotentiel: 0,
    tauxReussite: 0,
    parisActifs: 0
  };

  const handleOptimizeProfil = () => {
    // Logique d'optimisation du profil de pari
    setIsProfilOptimized(true);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="container mx-auto">
        {/* Avertissement Profil */}
        {!isProfilOptimized && (
          <div className="bg-yellow-600 bg-opacity-20 border-l-4 border-yellow-500 p-4 mb-6 flex items-center">
            <FireIcon className="h-8 w-8 text-yellow-500 mr-4" />
            <div>
              <h3 className="text-yellow-300 font-semibold">
                Optimisez votre profil de paris
              </h3>
              <p className="text-yellow-200 text-sm">
                Personnalisez vos paramètres pour des analyses de paris plus précises et personnalisées.
              </p>
              <button 
                onClick={handleOptimizeProfil}
                className="mt-2 bg-yellow-600 text-white px-4 py-2 rounded text-sm hover:bg-yellow-700 transition"
              >
                Optimiser mon profil
              </button>
            </div>
          </div>
        )}

        {/* Statistiques Quotidiennes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard 
            icon={<TrophyIcon className="h-6 w-6 text-blue-400" />}
            title="Paris Analysés"
            value={dailyStats.totalParisAnalyses}
          />
          <StatCard 
            icon={<CurrencyEuroIcon className="h-6 w-6 text-green-400" />}
            title="Gain Potentiel"
            value={dailyStats.gainPotentiel}
          />
          <StatCard 
            icon={<ChartBarIcon className="h-6 w-6 text-purple-400" />}
            title="Taux de Réussite"
            value={`${dailyStats.tauxReussite}%`}
          />
          <StatCard 
            icon={<LightBulbIcon className="h-6 w-6 text-yellow-400" />}
            title="Paris Actifs"
            value={dailyStats.parisActifs}
          />
        </div>

        {/* Coupon/Bonus du Jour */}
        <div className="bg-gray-800 shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-200 mb-4">
            Bonus du Jour
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Code: PARIBOT2024</p>
              <p className="text-2xl font-bold text-green-500">+50 000 XOF en paris gratuits</p>
            </div>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
              Activer
            </button>
          </div>
        </div>

        {/* Widget Abonnement Premium */}
        <div className="bg-blue-900 bg-opacity-30 border-l-4 border-blue-500 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-blue-300 mb-2">
                IAparibot Premium
              </h3>
              <p className="text-blue-200 mb-4">
                Analyses avancées et stratégies exclusives
              </p>
              <ul className="text-blue-300 space-y-2 mb-4">
                <li className="flex items-center">
                  <ShieldCheckIcon className="h-5 w-5 mr-2 text-green-400" />
                  Analyses temps réel
                </li>
                <li className="flex items-center">
                  <ShieldCheckIcon className="h-5 w-5 mr-2 text-green-400" />
                  Stratégies professionnelles
                </li>
                <li className="flex items-center">
                  <ShieldCheckIcon className="h-5 w-5 mr-2 text-green-400" />
                  Support dédié
                </li>
              </ul>
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center">
              <CurrencyEuroIcon className="h-5 w-5 mr-2" />
              Abonnement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant Carte de Statistiques
const StatCard: React.FC<{ 
  icon: React.ReactNode, 
  title: string, 
  value: number | string 
}> = ({ icon, title, value }) => (
  <div className="bg-gray-800 shadow rounded-lg p-4 flex items-center space-x-4 border border-gray-700">
    {icon}
    <div>
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  </div>
);

export default Dashboard;