import React, { useState } from 'react';
import { 
  ChevronRight, 
  Search, 
  Filter, 
  MapPin, 
  Heart, 
  Users, 
  Zap, 
  ArrowUpRight,
  Sparkles 
} from 'lucide-react';

const ProjectBreadcrumbPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Tous');

  // Catégories de projets
  const categories = ['Tous', 'Biodiversité', 'Énergie', 'Mobilité Douce', 'Zéro Déchet', 'Agriculture'];
  
  // Projets recommandés par l'IA
  const aiRecommendedProjects = [
    {
      title: "Reforestation Urbaine Intelligente",
      location: "Marseille",
      progress: 85,
      supporters: 178,
      category: "Biodiversité",
      aiMatch: 98
    },
    {
      title: "Capteurs de Qualité de l'Air Citoyens",
      location: "Paris",
      progress: 65,
      supporters: 203,
      category: "Énergie",
      aiMatch: 95
    },
    {
      title: "Récupération d'Eau de Pluie Connectée",
      location: "Strasbourg",
      progress: 70,
      supporters: 124,
      category: "Zéro Déchet",
      aiMatch: 92
    }
  ];

  // Projets similaires
  const similarProjects = [
    {
      title: "Jardin Partagé Intelligent",
      location: "Toulouse",
      progress: 60,
      supporters: 89,
      category: "Agriculture"
    },
    {
      title: "Réseau de Bornes de Recharge Solaires",
      location: "Bordeaux",
      progress: 75,
      supporters: 152,
      category: "Énergie"
    },
    {
      title: "Covoiturage Local Optimisé",
      location: "Lyon",
      progress: 90,
      supporters: 245,
      category: "Mobilité Douce"
    },
    {
      title: "Sensibilisation au Tri par Réalité Augmentée",
      location: "Nantes",
      progress: 45,
      supporters: 76,
      category: "Zéro Déchet"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center text-sm">
            <a href="/" className="text-emerald-600 hover:text-emerald-700">Accueil</a>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <a href="/projets" className="text-emerald-600 hover:text-emerald-700">Projets</a>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <span className="text-gray-600 font-medium">Projets Climatiques</span>
          </div>
        </div>
      </div>

      {/* Page Header with Search */}
      <div className="bg-emerald-700 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Projets Climatiques
          </h1>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="w-full md:w-2/3 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher un projet climatique..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border-0 focus:ring-2 focus:ring-emerald-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/3 flex items-center gap-2 bg-emerald-600 p-2 rounded-lg">
              <Sparkles className="text-yellow-300" size={20} />
              <span className="text-white text-sm">L'IA vous propose des projets adaptés à vos intérêts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            <Filter className="text-emerald-600" size={18} />
            <span className="text-sm font-medium mr-2">Filtrer par:</span>
            {categories.map((category) => (
              <button
                key={category}
                className={`whitespace-nowrap px-3 py-1 rounded-full text-sm ${
                  activeFilter === category 
                    ? 'bg-emerald-100 text-emerald-700 font-medium' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Section IA Recommandations */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="text-yellow-500" size={20} />
                Recommandés par IA pour vous
              </h2>
              <button className="text-emerald-600 text-sm font-medium flex items-center gap-1 hover:text-emerald-700">
                Voir tout
                <ArrowUpRight size={16} />
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {aiRecommendedProjects.map((project, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-lg overflow-hidden shadow-md bg-white relative"
                >
                  <div className="absolute top-0 right-0 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg flex items-center gap-1">
                    <Sparkles size={12} />
                    {project.aiMatch}% match
                  </div>
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
          </section>

          {/* Section Projets Similaires */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Projets Climatiques
              </h2>
              <div className="text-sm text-gray-500">
                Affichage de {similarProjects.length} projets
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {similarProjects.map((project, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white"
                >
                  <div className="h-40 bg-emerald-100" />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-600" />
                        <span className="text-xs text-gray-600">{project.location}</span>
                      </div>
                      <span className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-base font-bold mb-2">{project.title}</h3>
                    <div className="flex justify-between items-center mb-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-emerald-500 h-1.5 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="ml-2 text-xs font-medium">{project.progress}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Users className="w-3 h-3" />
                        <span className="text-xs">{project.supporters}</span>
                      </div>
                      <button className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 text-xs font-medium">
                        <Heart className="w-3 h-3" />
                        Soutenir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded bg-emerald-500 text-white">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
                  2
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
                  3
                </button>
                <span className="mx-1">...</span>
                <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100">
                  8
                </button>
              </div>
            </div>
          </section>

          {/* Section IA Assistant */}
          <section className="mt-12 bg-emerald-50 p-6 rounded-lg border border-emerald-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-emerald-100 w-10 h-10 rounded-full flex items-center justify-center">
                <Zap className="text-emerald-600" size={20} />
              </div>
              <h3 className="text-lg font-semibold">Assistant IA Climat</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Notre assistant IA peut vous aider à trouver des projets qui correspondent à vos valeurs et à vos intérêts en matière d'action climatique.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="bg-white border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm flex-1 text-gray-700">
                Quels projets ont le plus d'impact ?
              </button>
              <button className="bg-white border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm flex-1 text-gray-700">
                Projets près de chez moi
              </button>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm flex items-center justify-center gap-2">
                <Sparkles size={16} />
                Analyser mes préférences
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProjectBreadcrumbPage;