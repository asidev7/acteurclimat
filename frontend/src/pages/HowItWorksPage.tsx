import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  UserPlus, 
  Filter, 
  BarChart2, 
  TrendingUp, 
  Shield, 
  Calendar, 
  DollarSign, 
  Check, 
  ChevronRight 
} from 'lucide-react';

import { getSubscriptionPlans } from '../services/GetSubscription'; // Votre service pour récupérer les plans


const HowItWorks = () => {
 
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);

  useEffect(() => {
    // Récupérer les plans d'abonnement via l'API
    async function fetchPlans() {
      const plans = await getSubscriptionPlans();
      setSubscriptionPlans(plans);
    }

    fetchPlans();
  }, []);

  // Étapes pour commencer
  const steps = [
    {
      icon: <UserPlus size={28} />,
      title: "Créez votre compte",
      description: "Inscrivez-vous en quelques secondes avec votre email ou via les réseaux sociaux."
    },
    {
      icon: <DollarSign size={28} />,
      title: "Choisissez votre abonnement",
      description: "Sélectionnez le plan qui correspond à vos besoins et à votre budget."
    },
    {
      icon: <Filter size={28} />,
      title: "Filtrez les matchs",
      description: "Utilisez nos filtres avancés pour trouver les meilleures opportunités du jour."
    },
    {
      icon: <BarChart2 size={28} />,
      title: "Analysez les prédictions",
      description: "Consultez nos analyses détaillées et prenez des décisions éclairées."
    }
  ];
  
  // Fonctionnalités principales
  const features = [
    {
      icon: <Filter className="text-blue-500" size={32} />,
      title: "Filtres intelligents",
      description: "Filtrez les matchs par compétition, pays, cote, probabilité ou niveau de confiance."
    },
    {
      icon: <BarChart2 className="text-indigo-500" size={32} />,
      title: "Analyse statistique",
      description: "Accédez à des statistiques détaillées et des tendances historiques pour chaque match."
    },
    {
      icon: <TrendingUp className="text-purple-500" size={32} />,
      title: "Prédictions par IA",
      description: "Notre algorithme d'intelligence artificielle analyse des milliers de données pour des prédictions précises."
    },
    {
      icon: <Shield className="text-green-500" size={32} />,
      title: "Mise responsable",
      description: "Recommandations de mise adaptées à votre budget et stratégie personnelle."
    },
    {
      icon: <Calendar className="text-red-500" size={32} />,
      title: "Calendrier des matchs",
      description: "Visualisez tous les matchs à venir avec leurs cotes et probabilités en temps réel."
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb Banner */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm mb-4">
            <Link to="/" className="hover:text-blue-200 transition">Accueil</Link>
            <ChevronRight size={16} className="mx-2" />
            <span className="font-medium">Comment ça marche</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Comment ça marche</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl">
            Découvrez comment notre plateforme vous aide à maximiser vos chances de gains grâce à l'analyse avancée et l'intelligence artificielle.
          </p>
        </div>
      </div>

      {/* Section: Comment commencer */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Commencez en 4 étapes simples</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:shadow-lg transition duration-300 text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-800 mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Fonctionnalités principales */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Nos fonctionnalités avancées</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Profitez d'outils sophistiqués conçus pour vous aider à prendre les meilleures décisions possibles.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition duration-300">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-4">Nos plans d'abonnement</h2>
    <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
      Choisissez le plan qui correspond à vos besoins et commencez à optimiser vos paris dès aujourd'hui.
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
          style={{ minHeight: '400px' }} // Ajustez cette hauteur selon votre besoin
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
              {plan.features.map((feature, fIndex) => (
                <li key={fIndex} className="flex items-start">
                  <Check size={20} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6">
            <Link
              to="/connexion"
              className={`block text-center py-3 px-4 rounded-lg text-white font-medium transition-colors ${plan.buttonColor}`}
            >
              Commencer maintenant
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Section: FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Questions fréquentes</h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Comment sont calculées vos prédictions ?</h3>
              <p className="text-gray-600">
                Nos prédictions sont basées sur un algorithme d'IA avancé qui analyse des milliers de données historiques, 
                les statistiques récentes des équipes, les confrontations directes, et de nombreux autres facteurs comme 
                les blessures, suspensions et conditions météorologiques.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Puis-je annuler mon abonnement à tout moment ?</h3>
              <p className="text-gray-600">
                Oui, vous pouvez annuler votre abonnement à tout moment depuis votre espace membre. 
                Vous continuerez à bénéficier de votre abonnement jusqu'à la fin de la période en cours.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Quel est le taux de réussite de vos prédictions ?</h3>
              <p className="text-gray-600">
                Notre taux de réussite moyen se situe entre 65% et 75% selon les compétitions. 
                Vous pouvez consulter nos statistiques détaillées et notre historique de performance 
                directement sur la plateforme.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Est-ce que je peux tester avant de m'abonner ?</h3>
              <p className="text-gray-600">
                Oui, nous offrons un essai gratuit de 7 jours pour tous les nouveaux utilisateurs, 
                vous permettant d'explorer toutes les fonctionnalités de notre plateforme avant de vous engager.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à optimiser vos paris sportifs ?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Rejoignez notre communauté de parieurs et commencez à utiliser l'analyse de données pour améliorer vos résultats.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/connexion"
              className="bg-white text-blue-800 hover:bg-blue-100 py-3 px-8 rounded-lg font-bold transition-colors"
            >
              Créer un compte
            </Link>
            <Link
              to="/predictions"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 py-3 px-8 rounded-lg font-bold transition-colors"
            >
              Voir les prédictions du jour
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;