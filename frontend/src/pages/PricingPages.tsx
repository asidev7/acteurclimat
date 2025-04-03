import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Filter, 
  BarChart2, 
  TrendingUp, 
  Shield, 
  Calendar, 
  Check, 
  ChevronRight 
} from 'lucide-react';

import { getSubscriptionPlans } from '../services/GetSubscription';

const PricingPage = () => {
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const plans = await getSubscriptionPlans();
        if (plans && Array.isArray(plans)) {
          setSubscriptionPlans(plans);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        setError("Failed to load subscription plans.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPlans();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const features = [
    {
      icon: <Filter className="text-blue-500" size={32} />, 
      title: "Filtres Intelligents", 
      description: "Filtrez les matchs par compétition, pays, cotes, probabilité ou niveau de confiance."
    },
    {
      icon: <BarChart2 className="text-indigo-500" size={32} />, 
      title: "Analyse Statistique", 
      description: "Accédez à des statistiques détaillées et aux tendances historiques de chaque match."
    },
    {
      icon: <TrendingUp className="text-purple-500" size={32} />, 
      title: "Prédictions par IA", 
      description: "Notre algorithme analyse des milliers de données pour des prédictions précises."
    },
    {
      icon: <Shield className="text-green-500" size={32} />, 
      title: "Pari Responsable", 
      description: "Recommandations adaptées à votre budget et stratégie personnelle."
    },
    {
      icon: <Calendar className="text-red-500" size={32} />, 
      title: "Calendrier des Matchs", 
      description: "Consultez tous les matchs à venir avec les cotes et probabilités en temps réel."
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm mb-4">
            <Link to="/" className="hover:text-blue-200 transition">Accueil</Link>
            <ChevronRight size={16} className="mx-2" />
            <span className="font-medium">Tarifs</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nos Tarifs</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl">
            Choisissez l'abonnement qui vous convient et optimisez votre stratégie de pari dès aujourd'hui.
          </p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Nos Offres d'Abonnement</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Sélectionnez l'offre qui correspond à vos besoins et commencez à optimiser vos paris dès maintenant.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {subscriptionPlans.map((plan, index) => (
              <div
                key={index}
                className={`flex flex-col justify-between rounded-xl overflow-hidden shadow-lg border transition-all duration-300 ${
                  plan.popular
                    ? 'transform md:-translate-y-4 border-indigo-500 ring-2 ring-indigo-500 ring-opacity-50'
                    : 'border-gray-200 hover:shadow-xl'
                }`}
                style={{ minHeight: '400px' }}
              >
                {plan.popular && (
                  <div className="bg-indigo-600 text-white text-center py-2 font-medium">
                    Recommandé
                  </div>
                )}
                <div className="p-6 bg-white flex-grow">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold mb-4">
                    {plan.price} FCFA <span className="text-gray-500 text-base font-normal">/mois</span>
                  </div>
                  <ul className="mb-8 space-y-3">
                    {Array.isArray(plan.features) && plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start">
                        <Check size={20} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6">
                  <Link
                    to="/inscription"
                    className={`block text-center py-3 px-4 rounded-lg text-white font-medium transition-colors ${plan.buttonColor}`}
                  >
                    S'abonner
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Additional sections here */}
    </div>
  );
};

export default PricingPage;
