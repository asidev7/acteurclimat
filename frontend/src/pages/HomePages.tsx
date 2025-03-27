import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section avec animation */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-24 overflow-hidden">
        {/* Cercles animés en arrière-plan */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-10 -top-20 w-64 h-64 bg-blue-400 rounded-full opacity-20"></div>
          <div className="absolute left-10 bottom-10 w-40 h-40 bg-indigo-300 rounded-full opacity-20"></div>
          <div className="absolute right-1/4 bottom-1/3 w-32 h-32 bg-purple-400 rounded-full opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Prédictions sportives <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">alimentées par l'IA</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-light">
              Maximisez vos gains grâce à notre technologie d'intelligence artificielle avancée qui analyse des milliers de données en temps réel.
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Link 
              to="/predictions" 
              className="bg-white text-blue-700 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Découvrir les prédictions
            </Link>
            <Link 
              to="/how-it-works" 
              className="bg-transparent hover:bg-blue-700 border-2 border-white text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 hover:shadow-lg"
            >
              Comment ça marche
            </Link>
          </motion.div>
          
          <motion.div 
            className="mt-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl inline-block">
              <p className="text-lg font-medium">🔥 Déjà <span className="font-bold text-yellow-300">+15 000</span> parieurs satisfaits</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section IA PariBot */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-4">INNOVATION</span>
            <h2 className="text-4xl font-bold mb-6">Notre PariBot IA, votre expert personnel</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une technologie révolutionnaire qui analyse les statistiques, l'historique des équipes et les conditions actuelles pour générer des prédictions ultra-précises.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-1 rounded-2xl shadow-lg">
                <div className="bg-white rounded-2xl p-6 h-full">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">Traitement Big Data</h3>
                        <p className="text-gray-600">Analyse de + de 10 000 matchs et 500 variables par prédiction</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">Taux de succès élevé</h3>
                        <p className="text-gray-600">Précision de 78% sur les grands championnats européens</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">Temps réel</h3>
                        <p className="text-gray-600">Mise à jour continue des cotes et facteurs d'influence</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-6 relative z-10">
                <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
                    <div className="h-3 w-3 bg-yellow-500 rounded-full mr-2"></div>
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">P</div>
                        <div className="text-sm font-medium">PariBot IA</div>
                      </div>
                      <p className="text-gray-700">Analyse du match PSG vs. Marseille (Ligue 1) :</p>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li className="flex items-center"><span className="text-green-600 mr-2">✓</span> Forme récente: PSG 4 victoires, Marseille 2 défaites</li>
                        <li className="flex items-center"><span className="text-green-600 mr-2">✓</span> Historique confrontations: 70% victoires PSG</li>
                        <li className="flex items-center"><span className="text-green-600 mr-2">✓</span> Absences clés: 2 titulaires Marseille</li>
                      </ul>
                    </div>
                    <div className="bg-indigo-50 rounded-lg p-4">
                      <p className="font-bold text-indigo-800">Prédiction: <span className="text-indigo-600">Victoire PSG (73% probabilité)</span></p>
                      <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 rounded-full" style={{ width: '73%' }}></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>Faible</span>
                        <span>Élevée</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Éléments décoratifs */}
              <div className="absolute -bottom-10 -right-10 h-24 w-24 bg-yellow-400 rounded-full opacity-20 z-0"></div>
              <div className="absolute -top-6 -left-6 h-16 w-16 bg-blue-500 rounded-full opacity-10 z-0"></div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Comment ça marche */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm mb-4">PROCESSUS</span>
            <h2 className="text-4xl font-bold mb-6">Comment fonctionne notre technologie</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un processus simple et efficace pour vous aider à prendre les meilleures décisions.
            </p>
          </motion.div>
          
          <div className="relative">
            {/* Ligne de connexion entre les étapes */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {[
                {
                  title: "Collecte des données",
                  description: "Nos algorithmes collectent des milliers de données sportives en temps réel.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                  )
                },
                {
                  title: "Analyse IA",
                  description: "Notre intelligence artificielle traite les informations et identifie les tendances.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )
                },
                {
                  title: "Validation experts",
                  description: "Nos experts sportifs vérifient et affinent les prédictions générées.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  )
                },
                {
                  title: "Recommandations",
                  description: "Recevez nos meilleures prédictions directement sur votre compte.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                  )
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="flex flex-col items-center"
                >
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-700 w-16 h-16 rounded-full flex items-center justify-center shadow-lg mb-6">
                    {step.icon}
                  </div>
                  <div className="bg-white rounded-xl shadow-md p-6 text-center h-full w-full">
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
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
              to="/signup"
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

      {/* Témoignages */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-700 font-semibold text-sm mb-4">TÉMOIGNAGES</span>
            <h2 className="text-4xl font-bold mb-6">Ce que disent nos utilisateurs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez pourquoi des milliers de parieurs font confiance à notre plateforme.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Thomas L.",
                role: "Parieur depuis 2 ans",
                quote: "Grâce à PariBot, j'ai augmenté mes gains de 43% en seulement 3 mois. Les prédictions sont vraiment fiables !",
                avatar: "M"
              },
              {
                name: "Sophie M.",
                role: "Utilisatrice premium",
                quote: "J'avais essayé d'autres services de prédictions sans succès. Votre technologie IA fait vraiment la différence.",
                avatar: "S"
              },
              {
                name: "Marc D.",
                role: "Membre depuis 6 mois",
                quote: "L'interface est intuitive et les analyses détaillées m'aident à comprendre les prédictions. Je recommande !",
                avatar: "J"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white border border-gray-100 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                <div className="mt-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "97%", label: "Satisfaction client" },
              { value: "30K+", label: "Prédictions générées" },
              { value: "78%", label: "Précision moyenne" },
              { value: "15K+", label: "Utilisateurs actifs" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                <p className="text-indigo-200">{stat.label}</p>
              </motion.div>
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

      {/* CTA Section améliorée */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">Prêt à révolutionner vos paris sportifs ?</h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Rejoignez des milliers d'utilisateurs qui améliorent leurs résultats grâce à nos prédictions basées sur l'IA.
            </p>
            
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="text-left">
                  <h3 className="text-2xl font-bold mb-4">Créez votre compte gratuitement</h3>
                  <ul className="space-y-3 mb-6">
                    {[
                      "Accès à 3 prédictions gratuites par semaine",
                      "Analyses détaillées des matchs majeurs",
                      "Notifications pour les matchs à fort potentiel"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-600 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
                  <form className="space-y-4">
                    <div>
                      <input 
                        type="email" 
                        placeholder="Votre email" 
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300" 
                      />
                    </div>
                    <div>
                      <input 
                        type="password" 
                        placeholder="Créez un mot de passe" 
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300" 
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:from-blue-700 hover:to-indigo-800 transform hover:-translate-y-1"
                    >
                      Créer mon compte
                    </button>
                    <p className="text-xs text-gray-500 mt-2">
                      En vous inscrivant, vous acceptez nos conditions d'utilisation et politique de confidentialité.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;