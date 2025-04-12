import React from 'react';
import { 
  ChevronRight, 
  Users, 
  Target, 
  Leaf, 
  Award,
  Calendar,
  MapPin,
  Mail,
  Phone,
  ExternalLink,
  CheckCircle
} from 'lucide-react';

const AboutUsPage = () => {
  // Équipe de direction
  const teamMembers = [
    {
      name: "Marie Dupont",
      role: "Fondatrice & Directrice",
      bio: "Experte en politique environnementale avec 15 ans d'expérience dans le développement de projets durables.",
      imgBg: "bg-emerald-100"
    },
    {
      name: "Thomas Martin",
      role: "Responsable Partenariats",
      bio: "Spécialiste en mobilisation citoyenne et création d'alliances stratégiques pour l'action climatique.",
      imgBg: "bg-emerald-100"
    },
    {
      name: "Sophie Leroux",
      role: "Directrice des Projets",
      bio: "Ingénieure en environnement passionnée par l'innovation sociale et les solutions basées sur la nature.",
      imgBg: "bg-emerald-100"
    },
    {
      name: "Antoine Moreau",
      role: "Expert Technique",
      bio: "Spécialiste des énergies renouvelables et de l'efficacité énergétique avec une approche territoriale.",
      imgBg: "bg-emerald-100"
    }
  ];

  // Partenaires
  const partners = [
    "Ministère de la Transition Écologique",
    "Agence de l'Environnement et de la Maîtrise de l'Énergie (ADEME)",
    "Réseau Action Climat",
    "Fondation pour la Nature et l'Homme",
    "Région Nouvelle-Aquitaine",
    "Métropole de Lyon",
    "Ville de Nantes",
    "Institut de Recherche pour le Développement"
  ];

  // Jalons historiques
  const milestones = [
    {
      year: "2018",
      title: "Création de l'Initiative",
      description: "Lancement de la plateforme par un collectif de citoyens engagés pour le climat."
    },
    {
      year: "2019",
      title: "Premier Forum Citoyen",
      description: "Organisation du premier événement réunissant 500 acteurs locaux pour co-construire des solutions."
    },
    {
      year: "2020",
      title: "Développement National",
      description: "Extension de notre présence dans 12 régions françaises et création d'antennes locales."
    },
    {
      year: "2022",
      title: "Prix de l'Innovation Climatique",
      description: "Reconnaissance de notre approche participative par un prix national d'innovation sociale."
    },
    {
      year: "2024",
      title: "Lancement de l'Académie Climat",
      description: "Création d'un programme de formation pour accompagner les porteurs de projets locaux."
    }
  ];

  // Réalisations
  const achievements = [
    {
      stat: "144",
      label: "Projets accompagnés",
      description: "Solutions concrètes mises en œuvre par des collectifs citoyens à travers la France."
    },
    {
      stat: "34K FCFA",
      label: "Financements mobilisés",
      description: "Ressources financières collectées pour soutenir les initiatives locales pour le climat."
    },
    {
      stat: "7,500",
      label: "Tonnes de CO2 évitées",
      description: "Impact concret de nos projets sur la réduction des émissions de gaz à effet de serre."
    },
    {
      stat: "1,045",
      label: "Citoyens engagés",
      description: "Personnes actives dans notre réseau, contribuant à la transition écologique territoriale."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center text-sm">
            <a href="/" className="text-emerald-600 hover:text-emerald-700">Accueil</a>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <span className="text-gray-600 font-medium">Qui Sommes-Nous</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-emerald-700 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Qui Sommes-Nous
          </h1>
          <p className="text-xl text-emerald-100 mb-0 max-w-3xl mx-auto">
            Une communauté engagée pour accélérer la transition écologique à l'échelle des territoires
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 py-12">
          
          {/* Mission et Vision */}
          <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Target className="text-emerald-600" size={24} />
                  Notre Mission
                </h2>
                <p className="text-gray-700 mb-6">
                  Nous facilitons l'engagement citoyen pour le climat en connectant les individus, les associations et les collectivités autour de projets concrets. Notre plateforme permet à chacun de contribuer à la transition écologique de son territoire, quelle que soit son expertise ou sa disponibilité.
                </p>
                <p className="text-gray-700 mb-6">
                  Convaincus que les solutions existent déjà localement, nous valorisons les initiatives innovantes et accélérons leur déploiement en mobilisant l'intelligence collective et les ressources nécessaires à leur réussite.
                </p>
                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4">
                  <p className="text-emerald-800 font-medium italic">
                    "Transformer chaque territoire en laboratoire vivant de la transition écologique, où chaque citoyen peut devenir acteur du changement."
                  </p>
                </div>
              </div>
              <div className="bg-emerald-100 h-64 md:h-80 rounded-lg flex items-center justify-center">
                <Leaf className="text-emerald-600" size={80} />
              </div>
            </div>
          </section>

          {/* Valeurs */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Nos Valeurs</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Users className="text-emerald-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Collaboration</h3>
                <p className="text-gray-600">
                  Nous croyons en la puissance de l'intelligence collective et favorisons les approches participatives qui impliquent tous les acteurs du territoire.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Target className="text-emerald-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Impact</h3>
                <p className="text-gray-600">
                  Nous privilégions les actions concrètes et mesurables qui transforment réellement nos territoires et réduisent notre empreinte écologique.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Award className="text-emerald-600" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Inclusion</h3>
                <p className="text-gray-600">
                  Nous développons des outils et des méthodes accessibles à tous, convaincus que la transition écologique doit bénéficier à l'ensemble de la société.
                </p>
              </div>
            </div>
          </section>

          {/* Notre Histoire */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Notre Histoire</h2>
            <div className="relative">
              {/* Timeline vertical line */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-emerald-200"></div>
              
              {/* Timeline events */}
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`relative flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Timeline dot */}
                    <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-emerald-500 border-4 border-emerald-100"></div>
                    
                    {/* Content */}
                    <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center mb-2">
                          <span className="text-emerald-600 font-bold mr-2">{milestone.year}</span>
                          <h3 className="text-lg font-semibold">{milestone.title}</h3>
                        </div>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Notre Impact */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Notre Impact</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">{achievement.stat}</div>
                  <h3 className="text-lg font-semibold mb-3">{achievement.label}</h3>
                  <p className="text-gray-600 text-sm">{achievement.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Notre Équipe */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Notre Équipe</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <div className={`h-48 ${member.imgBg} flex items-center justify-center`}>
                    <Users className="text-emerald-600" size={48} />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                    <p className="text-emerald-600 text-sm mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Nos Partenaires */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Nos Partenaires</h2>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {partners.map((partner, index) => (
                  <div key={index} className="flex items-center justify-center h-24 bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <span className="text-center text-gray-700 font-medium">{partner}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Nous Rejoindre */}
          <section className="mb-16">
            <div className="bg-emerald-50 rounded-lg p-8 border border-emerald-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Rejoignez Notre Mouvement</h2>
              <p className="text-center text-gray-700 mb-8 max-w-3xl mx-auto">
                Que vous soyez un citoyen engagé, une association locale ou une collectivité territoriale, 
                il existe de nombreuses façons de collaborer avec nous pour accélérer la transition écologique.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-4 text-emerald-700">Pour les Citoyens</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <span className="text-gray-700">Participez à des projets près de chez vous</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <span className="text-gray-700">Partagez vos compétences et votre temps</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <span className="text-gray-700">Proposez vos propres initiatives</span>
                    </li>
                  </ul>
                  <button className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded font-medium">
                    Créer un compte
                  </button>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-4 text-emerald-700">Pour les Associations</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <span className="text-gray-700">Gagnez en visibilité auprès du public</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <span className="text-gray-700">Mobilisez de nouveaux bénévoles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <span className="text-gray-700">Accédez à des ressources et financements</span>
                    </li>
                  </ul>
                  <button className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded font-medium">
                    Devenir partenaire
                  </button>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-4 text-emerald-700">Pour les Collectivités</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <span className="text-gray-700">Impliquez vos citoyens dans votre plan climat</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <span className="text-gray-700">Bénéficiez de notre expertise technique</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <span className="text-gray-700">Valorisez les initiatives locales</span>
                    </li>
                  </ul>
                  <button className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded font-medium">
                    Nous contacter
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Contactez-Nous</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-6 text-emerald-700">Nos Coordonnées</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-emerald-600 mt-1" />
                    <div>
                      <p className="font-medium">Siège Social</p>
                      <p className="text-gray-600">
                        123 Avenue de la Transition<br />
                        75011 Paris, France
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-emerald-600 mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:contact@projetsclimat.org" className="text-emerald-600 hover:underline">
                        contact@projetsclimat.org
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-emerald-600 mt-1" />
                    <div>
                      <p className="font-medium">Téléphone</p>
                      <p className="text-gray-600">+33 (0)1 XX XX XX XX</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <ExternalLink className="w-5 h-5 text-emerald-600 mt-1" />
                    <div>
                      <p className="font-medium">Réseaux Sociaux</p>
                      <div className="flex gap-3 mt-2">
                        <a href="#" className="bg-emerald-100 w-8 h-8 rounded-full flex items-center justify-center text-emerald-700 hover:bg-emerald-200">
                          <span className="sr-only">Twitter</span>
                          <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="bg-emerald-100 w-8 h-8 rounded-full flex items-center justify-center text-emerald-700 hover:bg-emerald-200">
                          <span className="sr-only">Facebook</span>
                          <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="bg-emerald-100 w-8 h-8 rounded-full flex items-center justify-center text-emerald-700 hover:bg-emerald-200">
                          <span className="sr-only">LinkedIn</span>
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a href="#" className="bg-emerald-100 w-8 h-8 rounded-full flex items-center justify-center text-emerald-700 hover:bg-emerald-200">
                          <span className="sr-only">Instagram</span>
                          <i className="fab fa-instagram"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-6 text-emerald-700">Écrivez-nous</h3>
                <form>
                  <div className="grid gap-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
                      <input
                        type="text"
                        id="subject"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea
                        id="message"
                        rows={5}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      ></textarea>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded"
                      >
                        Envoyer
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
          
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;