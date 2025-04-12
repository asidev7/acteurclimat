import React from 'react';
import { MapPin, Heart, Users, MessageCircle, CheckCircle, ThumbsUp, Zap } from 'lucide-react';

const HomePage = () => {
  // Projets récents ou populaires
  const featuredProjects = [
    {
      title: "Forêt Urbaine Participative",
      location: "Bordeaux",
      progress: 75,
      supporters: 142,
      category: "Biodiversité"
    },
    {
      title: "Ateliers Réparation Vélo",
      location: "Lyon",
      progress: 90,
      supporters: 89,
      category: "Mobilité Douce"
    },
    {
      title: "Compostage Collectif",
      location: "Nantes",
      progress: 60,
      supporters: 214,
      category: "Zéro Déchet"
    }
  ];

  // Témoignages d'utilisateurs
  const testimonials = [
    {
      name: "Marie Dupont",
      role: "Citoyenne engagée",
      quote: "Grâce à cette plateforme, j'ai pu m'engager dans trois projets locaux et rencontrer des personnes partageant les mêmes valeurs que moi."
    },
    {
      name: "Thomas Martin",
      role: "Porteur de projet",
      quote: "La visibilité offerte par le site nous a permis de collecter rapidement des fonds et de mobiliser des bénévoles pour notre jardin partagé."
    },
    {
      name: "Sophie Leroux",
      role: "Association locale",
      quote: "Un outil précieux pour impliquer les citoyens dans nos actions environnementales et recueillir leurs précieux avis."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section simplifiée */}
      <section
      className="relative bg-[url('/assets/bg.jpg')] bg-cover bg-center py-16"
    >
      <div className="absolute inset-0 bg-emerald-800/70 z-0"></div> {/* Overlay */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Agissez pour le Climat près de chez vous !
          </h1>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Ensemble, créons un impact local pour un avenir durable
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Donner mon avis
            </button>
            <button className="bg-white text-emerald-700 px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
              <Heart className="w-5 h-5" />
              Soutenir un projet
            </button>
          </div>
        </div>
      </div>
    </section>

      {/* Section Statistiques simplifiée */}
      <section className="py-12 bg-emerald-700">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '1,045', label: 'Citoyens Engagés', icon: Users },
              { value: '144', label: 'Projets Soutenus', icon: CheckCircle },
              { value: '1,300', label: 'Avis Collectés', icon: MessageCircle },
              { value: '34k FCFA', label: 'Montant Collecté', icon: Heart },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-4 bg-emerald-600 rounded-lg text-center"
              >
                <stat.icon className="w-8 h-8 mx-auto text-white mb-2" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-emerald-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Projets simplifiée */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Projets Populaires</h2>
            <p className="text-lg text-gray-600">Découvrez les initiatives qui transforment nos territoires</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredProjects.map((project, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-md"
              >
                <div className="h-48 bg-emerald-100" />
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm text-gray-600">{project.location}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-3">{project.title}</h3>
                  <div className="flex justify-between items-center mb-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-emerald-500 h-2 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="ml-2 text-sm font-medium">{project.progress}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{project.supporters} soutiens</span>
                    </div>
                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded text-sm">
                      Voir plus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Comment ça marche */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Comment ça marche</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="text-emerald-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Partagez votre avis</h3>
              <p className="text-gray-600">
                Participez aux consultations citoyennes et partagez vos idées pour améliorer votre territoire.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <ThumbsUp className="text-emerald-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Soutenez des projets</h3>
              <p className="text-gray-600">
                Contribuez financièrement ou devenez bénévole pour des initiatives qui vous tiennent à cœur.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Zap className="text-emerald-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Créez l'impact</h3>
              <p className="text-gray-600">
                Suivez l'évolution des projets et constatez l'impact concret sur votre environnement local.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Témoignage simplifié */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Ce qu'ils en disent</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Call-to-Action */}
      <section className="py-12 bg-emerald-800 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Prêt à agir pour le climat ?</h2>
          <p className="text-lg text-emerald-100 mb-6 max-w-2xl mx-auto">
            Rejoignez notre communauté et participez à la transition écologique dans votre région.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-emerald-700 font-medium px-6 py-2 rounded hover:bg-gray-100">
              Créer un compte
            </button>
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-6 py-2 rounded">
              Découvrir les projets
            </button>
          </div>
        </div>
      </section>

      {/* Section Newsletter */}
      <section className="py-8 bg-emerald-600 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="md:w-2/3">
              <h3 className="text-xl font-bold mb-1">Restez informé</h3>
              <p className="text-emerald-100">Recevez notre newsletter sur les projets et actualités climatiques locales.</p>
            </div>
            <div className="md:w-1/3 w-full">
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  className="px-3 py-2 rounded-l w-full text-gray-800 focus:outline-none"
                />
                <button 
                  type="submit" 
                  className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-r"
                >
                  OK
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer simple */}
  
    </div>
  );
};

export default HomePage;