import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/DashboardLayout';
import { getDashboard, getUserStats, getFollowedCoupons } from '../../services/GetUser';
import { DashboardData, UserStats, FollowedCoupon } from '../../services/GetUser';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Clock, TrendingUp, Award, AlertTriangle, DollarSign } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [followedCoupons, setFollowedCoupons] = useState<FollowedCoupon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const dashData = await getDashboard();
        const userStats = await getUserStats();
        const coupons = await getFollowedCoupons();
        
        setDashboardData(dashData);
        setStats(userStats);
        setFollowedCoupons(coupons);
        setError(null);
      } catch (err) {
        setError('Erreur lors du chargement des données du tableau de bord');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Données du graphique de performance (à remplacer par des données réelles)
  const performanceData = [
    { name: 'Jan', profit: 400 },
    { name: 'Fév', profit: 300 },
    { name: 'Mars', profit: 600 },
    { name: 'Avr', profit: 800 },
    { name: 'Mai', profit: 500 },
    { name: 'Juin', profit: 900 },
  ];

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <p>Chargement de votre tableau de bord...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Message d'avertissement */}
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-amber-700">Avertissement important</h3>
              <div className="mt-2 text-amber-600">
                <p>
                  IAPARIBOT ne garantit pas des gains à 100%. Nos prédictions sont basées sur l'analyse 
                  de plus de 10 000 matchs, mais les paris sportifs comportent toujours un risque.
                  Pariez de façon responsable.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-blue-100">
                <Award className="h-6 w-6 text-blue-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Taux de réussite</p>
                <p className="text-2xl font-bold">{stats?.success_rate || 0}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-green-100">
                <DollarSign className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Profit total</p>
                <p className="text-2xl font-bold">{stats?.total_profit || 0}€</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-purple-100">
                <Clock className="h-6 w-6 text-purple-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Coupons suivis</p>
                <p className="text-2xl font-bold">{stats?.total_coupons_followed || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-amber-100">
                <TrendingUp className="h-6 w-6 text-amber-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Coupons gagnants</p>
                <p className="text-2xl font-bold">{stats?.winning_coupons || 0}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Graphique de performance */}
          <div className="bg-white p-4 rounded-lg shadow lg:col-span-2">
            <div className="mb-4 px-2">
              <h3 className="text-lg font-medium">Graphique de performance</h3>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={performanceData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }} 
                    name="Profit (€)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Activité récente */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="mb-4 px-2">
              <h3 className="text-lg font-medium">Activité récente</h3>
            </div>
            <div className="space-y-4">
              {dashboardData?.recent_coupons && dashboardData.recent_coupons.length > 0 ? (
                dashboardData.recent_coupons.map((coupon, index) => (
                  <div key={index} className="flex items-center p-3 border rounded-lg">
                    <div className={`w-2 h-8 rounded-full ${coupon.won ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div className="ml-3">
                      <p className="font-medium">{coupon.name || `Coupon #${coupon.id}`}</p>
                      <p className="text-sm text-gray-500">{new Date(coupon.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="ml-auto">
                      <p className={`font-bold ${coupon.won ? 'text-green-500' : 'text-red-500'}`}>
                        {coupon.won ? '+' : '-'}{coupon.stake}€
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">Aucune activité récente</p>
              )}
            </div>
          </div>
        </div>

        {/* Notifications */}
        {dashboardData?.notifications && dashboardData.notifications.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow mt-6">
            <div className="mb-4 px-2">
              <h3 className="text-lg font-medium">Notifications</h3>
            </div>
            <div className="space-y-2">
              {dashboardData.notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-3 border rounded-lg ${notification.is_read ? 'bg-gray-50' : 'bg-blue-50'}`}
                >
                  <h4 className="font-medium">{notification.title}</h4>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(notification.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DashboardPage;