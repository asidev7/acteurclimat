import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  UserPlus, 
  Filter, 
  BarChart2, 
  TrendingUp, 
  Shield, 
  Calendar, 
  ChevronRight,
  AlertCircle,
  Award,
  Star,
  Zap,
  Smartphone,
  Users,
  ThumbsUp,
  Check,
  ChevronDown
} from 'lucide-react';

const HowItWorks = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [stats, setStats] = useState({
    predictionsAccuracy: 74,
    usersCount: 15800,
    matchesAnalyzed: 28500,
    totalWinnings: '124M'
  });

  // Animation effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        const position = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (position < screenPosition) {
          element.classList.add('animate-active');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Étapes pour commencer
  const steps = [
    {
      icon: <UserPlus size={28} />,
      title: "Créez votre compte",
      description: "Inscrivez-vous en quelques secondes avec votre email ou via les réseaux sociaux."
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
    },
    {
      icon: <Zap size={28} />,
      title: "Maximisez vos gains",
      description: "Augmentez votre taux de réussite grâce à nos conseils d'experts et notre IA."
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
    },
    {
      icon: <Smartphone className="text-amber-500" size={32} />,
      title: "App mobile",
      description: "Accédez à toutes les fonctionnalités depuis votre smartphone, où que vous soyez."
    }
  ];

  // FAQ étendue
  const faqs = [
    {
      question: "Comment sont calculées vos prédictions ?",
      answer: "Nos prédictions sont basées sur un algorithme d'IA avancé qui analyse des milliers de données historiques, les statistiques récentes des équipes, les confrontations directes, et de nombreux autres facteurs comme les blessures, suspensions et conditions météorologiques. Notre système s'améliore constamment grâce au machine learning."
    },
    {
      question: "Quel est le taux de réussite de vos prédictions ?",
      answer: "Notre taux de réussite moyen se situe entre 65% et 75% selon les compétitions. Vous pouvez consulter nos statistiques détaillées et notre historique de performance directement sur la plateforme. Nous mettons à jour ces données quotidiennement pour une transparence totale."
    },
    {
      question: "Est-ce que je peux tester avant de m'abonner ?",
      answer: "Oui, nous offrons un essai gratuit de 7 jours pour tous les nouveaux utilisateurs, vous permettant d'explorer toutes les fonctionnalités de notre plateforme avant de vous engager. Aucune carte bancaire n'est requise pour l'essai."
    },
    {
      question: "Sur quels sports proposez-vous des prédictions ?",
      answer: "Nous couvrons principalement le football avec plus de 50 ligues à travers le monde, mais aussi le basketball, le tennis, le rugby et d'autres sports majeurs. Notre focus reste sur les compétitions où notre algorithme a montré les meilleurs résultats."
    },
    {
      question: "Comment accéder aux prédictions exclusives ?",
      answer: "Les prédictions exclusives à forte probabilité sont accessibles dans la section VIP de la plateforme. Ces sélections sont triées par nos experts et bénéficient d'une analyse approfondie pour maximiser vos chances de succès."
    }
  ];

  // Témoignages 
  const testimonials = [
    {
      name: "Jean M.",
      location: "Abidjan",
      text: "Depuis que j'utilise iaparibot, mon taux de réussite a augmenté de 30%. L'analyse IA fait vraiment la différence !",
      rating: 5
    },
    {
      name: "Sarah K.",
      location: "Dakar",
      text: "Les filtres avancés me permettent de trouver exactement les matchs qui correspondent à ma stratégie. Excellent outil !",
      rating: 5
    },
    {
      name: "Mohamed L.",
      location: "Bamako",
      text: "J'apprécie particulièrement les analyses détaillées qui accompagnent chaque prédiction. Très professionnel.",
      rating: 4
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
     
       <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm mb-4">
            <Link to="/" className="hover:text-blue-200 transition">Accueil</Link>
            <span className="mx-2">›</span>
            <span className="font-medium">Comment ça marche</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Maximisez vos chances avec nous</h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            Découvrez comment notre plateforme révolutionne les paris sportifs grâce à l'analyse avancée et l'intelligence artificielle.
          </p>
        </div>
      </div>

      {/* Section Statistiques */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="stat-card bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">{stats.predictionsAccuracy}%</div>
              <p className="text-gray-600 font-medium">Précision moyenne</p>
            </div>
            <div className="stat-card bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">{stats.usersCount.toLocaleString()}</div>
              <p className="text-gray-600 font-medium">Utilisateurs actifs</p>
            </div>
            <div className="stat-card bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold text-pink-600 mb-2">{stats.matchesAnalyzed.toLocaleString()}</div>
              <p className="text-gray-600 font-medium">Matchs analysés</p>
            </div>
            <div className="stat-card bg-gradient-to-br from-pink-50 to-red-50 rounded-xl p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">{stats.totalWinnings}</div>
              <p className="text-gray-600 font-medium">FCFA gagnés par nos utilisateurs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Comment commencer */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Commencez en 4 étapes simples</h2>
            <p className="text-gray-600 text-lg">Notre plateforme est conçue pour être intuitive et facile à utiliser, même pour les débutants.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="animate-on-scroll" style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:border-indigo-100 transition duration-300 text-center h-full flex flex-col">
                  <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white mb-6 mx-auto">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600 flex-grow">{step.description}</p>
                  <div className="mt-4 text-sm text-indigo-600 font-medium">Étape {index + 1}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Fonctionnalités principales */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-on-scroll">
            <span className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm mb-4">FONCTIONNALITÉS</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos outils avancés pour maximiser vos gains</h2>
            <p className="text-gray-600 text-lg">
              Profitez de la puissance de l'intelligence artificielle et de l'analyse de données pour optimiser vos paris sportifs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="animate-on-scroll" style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 hover:shadow-xl hover:border-blue-100 transition duration-300 h-full">
                  <div className="mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Témoignages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-on-scroll">
            <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 font-medium text-sm mb-4">TÉMOIGNAGES</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce que disent nos utilisateurs</h2>
            <p className="text-gray-600 text-lg">
              Rejoignez des milliers d'utilisateurs satisfaits qui ont transformé leur approche des paris sportifs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="animate-on-scroll" style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-8 shadow-sm hover:shadow-lg transition duration-300 h-full flex flex-col">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={20} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-6 flex-grow">" {testimonial.text} "</p>
                  <div>
                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center animate-on-scroll">
            <Link to="/temoignages" className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
              Voir tous les témoignages <ChevronRight size={18} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section: FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-on-scroll">
            <span className="inline-block px-4 py-1 rounded-full bg-purple-100 text-purple-700 font-medium text-sm mb-4">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Questions fréquentes</h2>
            <p className="text-gray-600 text-lg">
              Tout ce que vous devez savoir sur notre plateforme et nos services.
            </p>
          </div>
          
          <div className="space-y-4 animate-on-scroll">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300">
                <button 
                  className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <h3 className="text-xl font-semibold text-gray-800">{faq.question}</h3>
                  <ChevronDown 
                    size={24} 
                    className={`text-indigo-600 transition-transform duration-300 ${expandedFaq === index ? 'transform rotate-180' : ''}`}
                  />
                </button>
                <div 
                  className={`px-6 transition-all duration-300 overflow-hidden ${
                    expandedFaq === index ? 'max-h-96 pb-6' : 'max-h-0'
                  }`}
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl animate-on-scroll">
            <h3 className="text-xl font-semibold mb-4">Vous avez d'autres questions ?</h3>
            <Link 
              to="/contact" 
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors inline-flex items-center"
            >
              Contactez-nous <ChevronRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-on-scroll">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Prêt à transformer votre approche <br className="hidden md:block" />des paris sportifs ?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Rejoignez notre communauté et commencez à utiliser l'analyse de données pour améliorer vos résultats dès aujourd'hui.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/inscription"
                className="bg-white text-indigo-800 hover:bg-blue-50 py-4 px-8 rounded-lg font-bold transition-colors"
              >
                Créer un compte gratuit
              </Link>
              <Link
                to="/connexion"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 py-4 px-8 rounded-lg font-bold transition-colors"
              >
                Voir les prédictions du jour
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;