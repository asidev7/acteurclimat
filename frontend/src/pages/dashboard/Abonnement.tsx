// src/pages/SubscriptionPage.tsx
import { useEffect, useState } from 'react';
import ManageSubscribe from '../../services/ManageSubscribe';
import MainLayout from '../../layouts/DashboardLayout';
import { SubscriptionPlan, UserSubscription } from '../../services/ManageSubscribe';

const SubscriptionPage = () => {
  const [currentSub, setCurrentSub] = useState<UserSubscription | null>(null);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Charger les données initiales
  useEffect(() => {
    const loadData = async () => {
      try {
        const [subResponse, plansResponse] = await Promise.all([
          ManageSubscribe.getCurrentSubscription(),
          ManageSubscribe.getPlans()
        ]);

        if (subResponse.success) {
          setCurrentSub(subResponse.data);
        }

        if (plansResponse.success) {
          setPlans(plansResponse.data);
        }
      } catch (err) {
        setError('Erreur lors du chargement des données');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSubscribe = async (planId: number) => {
    try {
      const response = await ManageSubscribe.createSubscription(planId);
      if (response.success && response.data.payment_url) {
        window.location.href = response.data.payment_url;
      }
    } catch (err) {
      setError('Erreur lors de la création de l\'abonnement');
    }
  };

  if (loading) {
    return <MainLayout>Chargement en cours...</MainLayout>;
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Section Abonnement actuel */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Votre abonnement actuel</h2>
          
          {currentSub ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">
                    {currentSub.plan.name}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Statut: {currentSub.status === 'active' ? (
                      <span className="text-green-600">Actif</span>
                    ) : (
                      <span className="text-yellow-600">En attente</span>
                    )}
                  </p>
                  <p className="text-gray-600">
                    Prix: {currentSub.plan.price}€ / mois
                  </p>
                  <p className="text-gray-600">
                    Renouvellement automatique: {currentSub.auto_renew ? 'Activé' : 'Désactivé'}
                  </p>
                  {currentSub.end_date && (
                    <p className="text-gray-600">
                      Expiration: {new Date(currentSub.end_date).toLocaleDateString()}
                    </p>
                  )}
                </div>
                {currentSub.status === 'pending' && (
                  <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => currentSub && handleSubscribe(currentSub.plan.id)}
                  >
                    Payer maintenant
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-yellow-800">Vous n'avez pas d'abonnement actif</p>
            </div>
          )}
        </div>

        {/* Section Plans disponibles */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Plans d'abonnement disponibles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.filter(plan => plan.is_active).map((plan) => (
              <div key={plan.id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold mb-4">
                  {plan.price} FCFA <span className="text-sm text-gray-500">/mois</span>
                </p>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                
                <ul className="mb-6">
                  {Object.entries(plan.features).map(([feature, value]) => (
                    <li key={feature} className="flex items-center mb-2">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan.id)}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                >
                  Choisir ce plan
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Affichage des erreurs */}
        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default SubscriptionPage;