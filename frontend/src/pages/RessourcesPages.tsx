import React, { useState } from 'react';
import { 
  ChevronRight, 
  Search, 
  BookOpen, 
  FileText, 
  Video, 
  Download, 
  Star, 
  Calendar,
  Users,
  Clock,
  Filter,
  ExternalLink,
  TrendingUp
} from 'lucide-react';

const ResourcesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [activeFormat, setActiveFormat] = useState('Tous');

  // Catégories de ressources
  const categories = ['Tous', 'Biodiversité', 'Énergie', 'Alimentation', 'Mobilité', 'Économie Circulaire'];
  const formats = ['Tous', 'Guides', 'Rapports', 'Vidéos', 'Webinaires', 'Études de cas'];

  // Ressources populaires
  const popularResources = [
    {
      title: "Guide d'Actions Climatiques pour Collectivités",
      format: "PDF",
      category: "Biodiversité",
      downloads: 1245,
      date: "15/03/2025",
      imgBg: "bg-emerald-100"
    },
    {
      title: "Rapport sur l'Impact des Solutions Fondées sur la Nature",
      format: "PDF",
      category: "Biodiversité",
      downloads: 978,
      date: "02/02/2025",
      imgBg: "bg-emerald-100"
    },
    {
      title: "Vidéo: Comment Lancer un Projet de Compostage Collectif",
      format: "Vidéo",
      category: "Économie Circulaire",
      duration: "18 min",
      views: 3450,
      imgBg: "bg-emerald-100"
    }
  ];

  // Liste des ressources disponibles
  const resources = [
    {
      title: "L'Économie Circulaire en Pratique",
      description: "Guide pratique pour mettre en place des initiatives d'économie circulaire à l'échelle locale.",
      format: "Guide",
      category: "Économie Circulaire",
      date: "22/03/2025",
      pages: 48,
      author: "Réseau Action Climat"
    },
    {
      title: "Résilience Urbaine face au Changement Climatique",
      description: "Étude sur les stratégies d'adaptation pour les villes face aux défis climatiques.",
      format: "Rapport",
      category: "Énergie",
      date: "17/02/2025",
      pages: 86,
      author: "Institut de Recherche Environnementale"
    },
    {
      title: "Webinaire: Financer son Projet Écologique Local",
      description: "Présentation des différentes sources de financement pour les initiatives climatiques citoyennes.",
      format: "Webinaire",
      category: "Économie Circulaire",
      date: "05/01/2025",
      duration: "45 min",
      presenter: "Marie Dubois, Experte en Finance Verte"
    },
    {
      title: "Indicateurs d'Impact pour Projets Climatiques",
      description: "Méthodologie pour mesurer et communiquer l'impact de vos actions pour le climat.",
      format: "Guide",
      category: "Tous",
      date: "30/03/2025",
      pages: 32,
      author: "Collectif pour la Transition"
    },
    {
      title: "Étude de Cas: Quartier Zéro Carbone à Nantes",
      description: "Analyse détaillée du projet pilote de quartier neutre en carbone et ses résultats après 2 ans.",
      format: "Étude de cas",
      category: "Énergie",
      date: "12/02/2025",
      pages: 24,
      author: "Observatoire des Villes Durables"
    },
    {
      title: "Alimentation Durable et Circuits Courts",
      description: "Guide pratique pour développer des systèmes alimentaires locaux et résilients.",
      format: "Guide",
      category: "Alimentation",
      date: "08/03/2025",
      pages: 56,
      author: "Association Terre Vivante"
    },
    {
      title: "Mobilité Douce en Zone Rurale",
      description: "Solutions innovantes pour réduire la dépendance à la voiture dans les territoires ruraux.",
      format: "Rapport",
      category: "Mobilité",
      date: "25/01/2025",
      pages: 62,
      author: "Institut des Territoires"
    },
    {
      title: "Vidéo: Créer un Jardin Partagé dans votre Quartier",
      description: "Tutoriel pas à pas pour lancer un projet de jardin partagé avec sa communauté locale.",
      format: "Vidéo",
      category: "Biodiversité",
      date: "19/02/2025",
      duration: "22 min",
      presenter: "Thomas Laurent, Jardinier Urbain"
    }
  ];

  // Événements à venir
  const upcomingEvents = [
    {
      title: "Webinaire: Financement Participatif pour Projets Écologiques",
      date: "22 avril 2025",
      time: "18h00 - 19h30",
      category: "Économie Circulaire"
    },
    {
      title: "Atelier: Mesurer l'Impact Carbone de vos Initiatives",
      date: "15 mai 2025",
      time: "14h00 - 17h00",
      category: "Tous"
    },
    {
      title: "Conférence: Biodiversité Urbaine et Solutions Fondées sur la Nature",
      date: "5 juin 2025",
      time: "09h00 - 18h00",
      category: "Biodiversité"
    }
  ];

  // Filtrer les ressources en fonction des catégories actives
  const filteredResources = resources.filter(resource => 
    (activeCategory === 'Tous' || resource.category === activeCategory) &&
    (activeFormat === 'Tous' || resource.format === activeFormat)
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center text-sm">
            <a href="/" className="text-emerald-600 hover:text-emerald-700">Accueil</a>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <span className="text-gray-600 font-medium">Ressources</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-emerald-700 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Centre de Ressources
          </h1>
          <p className="text-emerald-100 mb-6 max-w-3xl">
            Explorez notre bibliothèque de ressources pour vous aider à comprendre les enjeux climatiques 
            et à mettre en œuvre des actions concrètes dans votre communauté.
          </p>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher des ressources..."
              className="w-full md:w-2/3 pl-10 pr-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-emerald-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="text-emerald-600" size={18} />
              <span className="text-sm font-medium">Thématique:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`whitespace-nowrap px-3 py-1 rounded-full text-sm ${
                      activeCategory === category 
                        ? 'bg-emerald-100 text-emerald-700 font-medium' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 md:ml-6">
              <span className="text-sm font-medium">Format:</span>
              <div className="flex flex-wrap gap-2">
                {formats.map((format) => (
                  <button
                    key={format}
                    className={`whitespace-nowrap px-3 py-1 rounded-full text-sm ${
                      activeFormat === format 
                        ? 'bg-emerald-100 text-emerald-700 font-medium' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveFormat(format)}
                  >
                    {format}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Popular Resources Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <TrendingUp className="text-emerald-600" size={20} />
                Ressources Populaires
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {popularResources.map((resource, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-lg overflow-hidden shadow-md bg-white"
                >
                  <div className={`h-40 ${resource.imgBg} relative`}>
                    {resource.format === "Vidéo" ? (
                      <Video className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-emerald-600" size={40} />
                    ) : (
                      <FileText className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-emerald-600" size={40} />
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full">
                        {resource.category}
                      </span>
                      <span className="text-xs flex items-center gap-1 text-gray-500">
                        {resource.format === "Vidéo" ? (
                          <>
                            <Clock className="w-3 h-3" />
                            {resource.duration}
                          </>
                        ) : (
                          <>
                            <Calendar className="w-3 h-3" />
                            {resource.date}
                          </>
                        )}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-3">{resource.title}</h3>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1 text-gray-600">
                        {resource.format === "Vidéo" ? (
                          <>
                            <Users className="w-4 h-4" />
                            <span className="text-sm">{resource.views} vues</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            <span className="text-sm">{resource.downloads} téléchargements</span>
                          </>
                        )}
                      </div>
                      <button className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 px-3 py-1 rounded text-sm font-medium flex items-center gap-1">
                        {resource.format === "Vidéo" ? (
                          <>
                            <Video className="w-4 h-4" />
                            Regarder
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            Télécharger
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Resources List Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Toutes les Ressources
              </h2>
              <div className="text-sm text-gray-500">
                {filteredResources.length} ressources disponibles
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {filteredResources.map((resource, i) => (
                <div 
                  key={i}
                  className={`p-4 flex flex-col md:flex-row md:items-center gap-4 ${
                    i < filteredResources.length - 1 ? 'border-b border-gray-200' : ''
                  }`}
                >
                  <div className="md:w-3/4">
                    <div className="flex items-center gap-2 mb-1">
                      {resource.format === "Guide" && <BookOpen className="text-emerald-600" size={16} />}
                      {resource.format === "Rapport" && <FileText className="text-emerald-600" size={16} />}
                      {resource.format === "Vidéo" && <Video className="text-emerald-600" size={16} />}
                      {resource.format === "Webinaire" && <Video className="text-emerald-600" size={16} />}
                      {resource.format === "Étude de cas" && <FileText className="text-emerald-600" size={16} />}
                      <span className="text-sm font-medium text-emerald-700">{resource.format}</span>
                      <span className="text-gray-400">|</span>
                      <span className="text-sm text-gray-500">{resource.category}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{resource.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{resource.description}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {resource.date}
                      </span>
                      {resource.pages && (
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          {resource.pages} pages
                        </span>
                      )}
                      {resource.duration && (
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {resource.duration}
                        </span>
                      )}
                      {resource.author && (
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {resource.author}
                        </span>
                      )}
                      {resource.presenter && (
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {resource.presenter}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="md:w-1/4 flex justify-end">
                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-2">
                      {resource.format === "Vidéo" || resource.format === "Webinaire" ? (
                        <>
                          <Video className="w-4 h-4" />
                          Regarder
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          Télécharger
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Events Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Calendar className="text-emerald-600" size={20} />
                Événements à Venir
              </h2>
              <button className="text-emerald-600 text-sm font-medium flex items-center gap-1 hover:text-emerald-700">
                Voir tout le calendrier
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {upcomingEvents.map((event, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-lg p-4 bg-white hover:border-emerald-300 hover:shadow-md transition-all"
                >
                  <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full mb-3 inline-block">
                    {event.category}
                  </span>
                  <h3 className="text-lg font-semibold mb-3">{event.title}</h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>{event.time}</span>
                  </div>
                  <button className="w-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 py-2 rounded text-sm font-medium flex items-center justify-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    S'inscrire
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Newsletter Section */}
          <section className="bg-emerald-700 rounded-lg p-6 text-white">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0">
                <h3 className="text-xl font-bold mb-2">Restez informé des nouvelles ressources</h3>
                <p className="text-emerald-100">
                  Inscrivez-vous à notre newsletter pour recevoir les derniers guides, études et invitations à nos événements.
                </p>
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
                    className="bg-emerald-900 hover:bg-emerald-800 px-4 py-2 rounded-r"
                  >
                    S'abonner
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;