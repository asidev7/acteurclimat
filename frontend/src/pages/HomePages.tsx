import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Zap, BarChart2, Shield, ChevronDown, Star, TrendingUp, Clock } from 'react-feather';
import { getSubscriptionPlans } from '../services/GetSubscription';

interface SubscriptionPlan {
  id: number;
  name: string;
  plan_type: string;
  price: number;
  duration_days: number;
  description: string;
  features: string[];
  buttonColor: string;
  popular: boolean;
}

const HomePage: React.FC = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "Comment fonctionne l'IA de prédiction ?",
      answer: "Notre intelligence artificielle analyse des milliers de données historiques..."
    },
    {
      question: "Quelle est la précision des prédictions ?",
      answer: "Notre taux de réussite moyen est de 78% sur les 6 derniers mois..."
    },
    {
      question: "Puis-je essayer gratuitement ?",
      answer: "Oui, nous offrons un essai gratuit de 7 jours sans engagement..."
    },
    {
      question: "Quels sports sont couverts ?",
      answer: "Football, Basketball, Tennis et 10 autres sports majeurs..."
    },
    {
      question: "Comment mettre à jour mon abonnement ?",
      answer: "Vous pouvez modifier votre formule directement depuis votre espace client..."
    },
    {
      question: "Quelle est la fréquence des mises à jour ?",
      answer: "Les données sont mises à jour en temps réel jusqu'au coup d'envoi..."
    },
    {
      question: "Est-ce légal d'utiliser cette plateforme ?",
      answer: "Notre service est 100% conforme à la législation en vigueur..."
    },
    {
      question: "Comment contacter le support ?",
      answer: "Notre équipe est disponible 24h/24 via le chat intégré..."
    },
    {
      question: "Quelles méthodes de paiement acceptez-vous ?",
      answer: "MTN Mobile Money, Moov, Carte bancaire, PayPal et crypto-monnaies principales..."
    },
    {
      question: "Y a-t-il des frais cachés ?",
      answer: "Aucun frais supplémentaire n'est appliqué en dehors de l'abonnement..."
    },
    {
      question: "Comment annuler mon abonnement ?",
      answer: "L'annulation est instantanée depuis votre espace personnel..."
    },
    {
      question: "Les débutants peuvent-ils utiliser la plateforme ?",
      answer: "Notre interface intuitive est conçue pour tous les niveaux..."
    },
    {
      question: "Quelle différence entre les formules ?",
      answer: "Les formules varient par le nombre de prédictions et fonctionnalités..."
    },
    {
      question: "Est-ce compatible mobile ?",
      answer: "Oui, la plateforme est optimisée pour tous les appareils..."
    },
    {
      question: "Comment sont sécurisées mes données ?",
      answer: "Nous utilisons le chiffrement SSL 256-bit et l'authentification à deux facteurs..."
    }
  ];

  useEffect(() => {
    async function fetchPlans() {
      const plans = await getSubscriptionPlans();
      setSubscriptionPlans(plans);
    }

    fetchPlans();

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "Thomas L.",
      role: "Parieur professionnel",
      quote: "Depuis que j'utilise cette plateforme, mon taux de réussite est passé de 52% à 78%. L'IA analyse des aspects que je n'aurais jamais considérés.",
      avatar: "TL",
      stats: "+43% de gains"
    },
    {
      name: "Sophie M.",
      role: "Investisseuse sportive",
      quote: "La précision des prédictions sur les matchs de Ligue 1 est impressionnante. J'ai triplé mon bankroll en 6 mois grâce aux conseils premium.",
      avatar: "SM",
      stats: "3x ROI"
    },
    {
      name: "Marc D.",
      role: "Analyste sportif",
      quote: "En tant que professionnel, j'apprécie la profondeur des analyses. Les rapports détaillés m'ont aidé à affiner mes propres modèles prédictifs.",
      avatar: "MD",
      stats: "87% de précision"
    }
  ];

  const features = [
    {
      icon: <Zap className="text-blue-600" size={24} />,
      title: "Prédictions en temps réel",
      description: "Mises à jour continues jusqu'au coup d'envoi"
    },
    {
      icon: <BarChart2 className="text-indigo-600" size={24} />,
      title: "Analyses approfondies",
      description: "Plus de 500 indicateurs analysés par match"
    },
    {
      icon: <Shield className="text-green-600" size={24} />,
      title: "Garantie de qualité",
      description: "Vérification par nos experts sportifs"
    },
    {
      icon: <Clock className="text-purple-600" size={24} />,
      title: "Historique complet",
      description: "Accès aux 5 dernières saisons de données"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-16 overflow-hidden">
        {/* Animation de particules réduite */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white opacity-10"
              initial={{
                x: Math.random() * 100,
                y: Math.random() * 100,
                width: Math.random() * 8 + 4,
                height: Math.random() * 8 + 4
              }}
              animate={{
                x: Math.random() * 100,
                y: Math.random() * 100,
                transition: {
                  duration: Math.random() * 8 + 8,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-300">
                L'IA pour vos paris sportifs
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto font-light text-blue-100">
              Notre algorithme analyse plus de 10 000 données par match pour des prédictions précises.
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link 
              to="/inscription" 
              className="relative overflow-hidden group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span className="relative z-10">Essai gratuit 7 jours</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
            <Link 
              to="/boutique" 
              className="flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold py-4 px-6 rounded-full text-lg transition-all duration-300 hover:shadow-lg"
            >
              Connexion
            </Link>
          </motion.div>
          
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg p-3 rounded-xl border border-white/20">
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <img 
                    key={i}
                    src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i+30}.jpg`}
                    className="w-8 h-8 rounded-full border-2 border-white"
                    alt="User"
                  />
                ))}
              </div>
              <div className="text-left text-sm">
                <p><span className="font-bold text-yellow-300">15 000+</span> membres</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-xs ml-1">4.9/5</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section marques partenaires */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Partenariats officiels
            </h3>
            <h2 className="text-3xl font-bold text-gray-900">Ils nous font confiance</h2>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
            {[
              {
                name: "Betclic",
                url: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Logo_Betclic_2019.svg",
                alt: "Logo Betclic"
              },
              {
                name: "Winamax",
                url: "https://upload.wikimedia.org/wikipedia/commons/3/31/Logo_winamax_1080x1080px.png",
                alt: "Logo Winamax"
              },
              {
                name: "Unibet",
                url: "https://upload.wikimedia.org/wikipedia/commons/2/24/Unibet-Logo-white.jpg",
                alt: "Logo Unibet"
              },
              {
                name: "1xbet",
                url: "https://logodownload.org/wp-content/uploads/2023/03/1xbet-logo-0.png",
                alt: "Logo 1xbet"
              },
              {
                name: "Bet365",
                url: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Bet365_Logo.svg",
                alt: "Logo Bet365"
              },
            ].map((brand, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100
                }}
                className="flex justify-center"
              >
                <div className="relative group">
                  <img 
                    src={brand.url}
                    alt={brand.alt}
                    className="h-12 object-contain grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center mt-12"
          >
            <small className="text-gray-500 text-sm max-w-2xl mx-auto">
              Ces partenariats nous permettent d'intégrer directement les cotes officielles et d'offrir 
              une expérience de pari optimale à nos utilisateurs.
            </small>
          </motion.div>
        </div>
      </section>

      {/* Section Avantages améliorée */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 relative overflow-hidden"
              >
                {/* Fond décoratif */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Icône personnalisée */}
                <div className="mb-6 relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center transform group-hover:-rotate-12 transition-transform">
                    {index === 0 && (
                      <div className="text-white p-2">
                        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor">
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                            className="text-white"
                          />
                        </svg>
                      </div>
                    )}
                    
                    {index === 1 && (
                      <div className="text-white p-2">
                        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor">
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
                          />
                        </svg>
                      </div>
                    )}
                    
                    {index === 2 && (
                      <div className="text-white p-2">
                        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor">
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                          />
                        </svg>
                      </div>
                    )}
                    
                    {index === 3 && (
                      <div className="text-white p-2">
                        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor">
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                
                {/* Ligne décorative */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Statistiques impressionnantes */}
      <section className="py-20 bg-gradient-to-r from-indigo-700 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="text-5xl font-bold mb-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-300">78%</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Taux de réussite</h3>
              <p className="text-blue-200">
                Moyenne sur les 6 derniers mois dans les 5 grands championnats européens
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-5xl font-bold mb-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-cyan-300">+2.5M</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Données analysées</h3>
              <p className="text-blue-200">
                Statistiques traitées chaque jour par notre algorithme
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-5xl font-bold mb-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">94%</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Satisfaction clients</h3>
              <p className="text-blue-200">
                Des utilisateurs qui renouvellent leur abonnement chaque mois
              </p>
            </motion.div>
          </div>
        </div>
      </section>
{/* Section Abonnements - Mise à jour avec le nouveau format */}
<section className="py-20 bg-white">
  <div className="container mx-auto px-4">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16"
    >
      <span className="inline-block py-1 px-3 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 font-semibold text-sm mb-4">
        ABONNEMENTS
      </span>
      <h2 className="text-4xl font-bold mb-6">Choisissez votre formule</h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Sélectionnez l'offre qui correspond à vos besoins et commencez à gagner dès aujourd'hui.
      </p>
    </motion.div>
    
    {subscriptionPlans.length > 0 ? (
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {subscriptionPlans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={`flex flex-col rounded-xl overflow-hidden shadow-lg border transition-all duration-300 hover:shadow-xl ${
              plan.popular
                ? 'transform md:-translate-y-4 border-indigo-500 ring-2 ring-indigo-500 ring-opacity-50'
                : 'border-gray-200'
            }`}
          >
            {plan.popular && (
              <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-center py-2 font-medium">
                Le plus populaire
              </div>
            )}
            <div className="p-8 flex-grow">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price} FCFA</span>
                <span className="text-gray-500"> /mois</span>
              </div>
              <ul className="mb-8 space-y-3">
                {plan.features && typeof plan.features === 'object' ? (
                  // Si features est un objet (et non un tableau)
                  Object.entries(plan.features).map(([key, value], fIndex) => {
                    // Pour les valeurs booléennes, afficher "Oui" pour true
                    const displayValue = value === true ? "Oui" : value === false ? "Non" : value;
                    
                    // Formatage du nom de la fonctionnalité
                    const featureName = key
                      .split('_')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ');
                    
                    return (
                      <li key={fIndex} className="flex items-start">
                        <Check className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={18} />
                        <span className="text-gray-600">
                          <span className="font-medium">{featureName}:</span> {displayValue}
                        </span>
                      </li>
                    );
                  })
                ) : Array.isArray(plan.features) ? (
                  // Si features est un tableau (pour rétrocompatibilité)
                  plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start">
                      <Check className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={18} />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))
                ) : (
                  // Fallback si features n'est ni un objet ni un tableau
                  <li className="flex items-start">
                    <Check className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-gray-600">Fonctionnalités incluses</span>
                  </li>
                )}
              </ul>
            </div>
            <div className="px-8 pb-8">
              <Link
                to="/inscription"
                className={`block text-center py-3 px-4 rounded-lg font-bold transition-colors ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {plan.popular ? 'Commencer maintenant' : 'Choisir cette offre'}
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    ) : (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p>Chargement des offres...</p>
      </div>
    )}
    
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="text-center mt-12 text-gray-500"
    >
      <p>Essai gratuit de 7 jours sans engagement. Annulation possible à tout moment.</p>
    </motion.div>
  </div>
</section>


      {/* Section Témoignages simplifiée */}
<section className="py-20 bg-gray-50">
  <div className="container mx-auto px-4">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-12"
    >
      <h2 className="text-4xl font-bold text-gray-800 mb-4">
        Ils partagent leur expérience
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Découvrez ce que nos utilisateurs disent de nous
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-blue-600 font-medium text-xl">
                {testimonial.name.charAt(0)}
              </span>
            </div>
            <div>
              <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          </div>

          <div className="flex mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
              />
            ))}
          </div>

          <blockquote className="text-gray-600 mb-6">
            "{testimonial.quote}"
          </blockquote>

          <div className="flex items-center text-blue-600 font-medium">
            <TrendingUp className="w-5 h-5 mr-2" />
            <span>{testimonial.stats}</span>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="flex justify-center mt-8 space-x-2">
      {testimonials.map((_, i) => (
        <button
          key={i}
          onClick={() => setActiveTestimonial(i)}
          className={`w-3 h-3 rounded-full transition-colors ${i === activeTestimonial ? 'bg-blue-600' : 'bg-gray-300'}`}
        />
      ))}
    </div>
  </div>
      </section>
      

      {/* Section CTA finale */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à révolutionner votre expérience des paris sportifs ?
            </h2>
            <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
              Rejoignez notre communauté et bénéficiez dès aujourd'hui de la puissance de l'IA appliquée aux paris sportifs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/inscription"
                className="bg-white text-blue-800 hover:bg-blue-100 py-4 px-10 rounded-full font-bold text-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Essai gratuit 7 jours
              </Link>
              <Link
                to="/contact"
                className="bg-transparent border-2 border-white hover:bg-white/10 py-4 px-10 rounded-full font-bold text-lg transition-colors"
              >
                Nous contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section FAQ Étoffée */}
<section className="py-20 bg-gray-50">
  <div className="container mx-auto px-4 max-w-6xl">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Questions Fréquentes</h2>
      <p className="text-gray-600 max-w-3xl mx-auto">Trouvez les réponses aux questions les plus posées</p>
    </motion.div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <button
            onClick={() => setActiveFaq(activeFaq === index ? null : index)}
            className="w-full p-6 text-left flex justify-between items-center"
          >
            <h3 className="text-lg font-semibold text-gray-800 pr-4">{faq.question}</h3>
            <ChevronDown className={`transform transition-transform duration-300 ${
              activeFaq === index ? 'rotate-180' : ''
            } text-blue-600 w-5 h-5`} />
          </button>

          <AnimatePresence>
            {activeFaq === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  </div>
</section>
    </div>
  );
};

export default HomePage;