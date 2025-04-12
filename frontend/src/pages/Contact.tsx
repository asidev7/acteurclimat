import React from 'react';
import { 
  ChevronRight, 
  MapPin,
  Mail,
  Phone,
  ExternalLink,
  Send,
  Calendar,
  Clock,
  HelpCircle,
  MessageSquare,
  CheckCircle
} from 'lucide-react';

const ContactPage = () => {
  // FAQ items
  const faqItems = [
    {
      question: "Comment puis-je rejoindre un projet local ?",
      answer: "Vous pouvez parcourir les projets disponibles dans votre région via notre plateforme en ligne. Une fois inscrit, vous pourrez contacter directement les porteurs de projet ou vous inscrire comme bénévole."
    },
    {
      question: "Comment proposer une initiative pour mon territoire ?",
      answer: "Créez un compte sur notre plateforme, puis utilisez l'option 'Proposer un projet'. Nos équipes examineront votre proposition et vous accompagneront dans les étapes suivantes pour la développer."
    },
    {
      question: "Quels types de soutien proposez-vous aux associations ?",
      answer: "Nous offrons un accompagnement technique, une aide à la recherche de financement, une mise en réseau avec d'autres acteurs et une visibilité accrue pour vos actions via notre plateforme et nos événements."
    },
    {
      question: "Comment devenir partenaire de votre organisation ?",
      answer: "Les partenariats peuvent prendre différentes formes : soutien financier, mécénat de compétences, collaboration sur des projets... Contactez-nous par mail ou via ce formulaire pour discuter des possibilités."
    }
  ];

  // Horaires d'ouverture
  const openingHours = [
    { day: "Lundi - Vendredi", hours: "9h00 - 18h00" },
    { day: "Samedi", hours: "10h00 - 14h00" },
    { day: "Dimanche", hours: "Fermé" }
  ];

  // Bureaux régionaux
  const regionalOffices = [
    { 
      city: "Paris (Siège)",
      address: "123 Avenue de la Transition\n75011 Paris",
      phone: "+33 (0)1 XX XX XX XX"
    },
    { 
      city: "Lyon",
      address: "45 Rue de l'Écologie\n69003 Lyon",
      phone: "+33 (0)4 XX XX XX XX"
    },
    { 
      city: "Bordeaux",
      address: "7 Place de la Durabilité\n33000 Bordeaux",
      phone: "+33 (0)5 XX XX XX XX"
    },
    { 
      city: "Nantes",
      address: "28 Boulevard du Climat\n44000 Nantes",
      phone: "+33 (0)2 XX XX XX XX"
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
            <span className="text-gray-600 font-medium">Contactez-Nous</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-emerald-700 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Contactez-Nous
          </h1>
          <p className="text-xl text-emerald-100 mb-0 max-w-3xl mx-auto">
            Notre équipe est à votre disposition pour vous accompagner dans vos projets de transition écologique
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 py-12">
          
          {/* Contact Information and Form */}
          <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Contact Information */}
              <div>
                <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Nos Coordonnées</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-emerald-100 p-3 rounded-full">
                        <MapPin className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Notre siège social</h3>
                        <p className="text-gray-600">
                          123 Avenue de la Transition<br />
                          75011 Paris, France
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-emerald-100 p-3 rounded-full">
                        <Mail className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Email</h3>
                        <a href="mailto:contact@projetsclimat.org" className="text-emerald-600 hover:underline">
                          contact@projetsclimat.org
                        </a>
                        <p className="text-gray-500 text-sm mt-1">
                          Nous répondons généralement sous 24-48 heures ouvrées
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-emerald-100 p-3 rounded-full">
                        <Phone className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Téléphone</h3>
                        <p className="text-gray-600">+33 (0)1 XX XX XX XX</p>
                        <p className="text-gray-500 text-sm mt-1">
                          Du lundi au vendredi de 9h à 18h
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-emerald-100 p-3 rounded-full">
                        <Calendar className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Prendre rendez-vous</h3>
                        <p className="text-gray-600">
                          Besoin d'un entretien personnalisé ?
                        </p>
                        <a href="#" className="text-emerald-600 hover:underline">
                          Réserver un créneau →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <Clock className="w-6 h-6 text-emerald-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Horaires d'ouverture</h2>
                  </div>
                  
                  <ul className="space-y-4">
                    {openingHours.map((item, index) => (
                      <li key={index} className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="font-medium">{item.day}</span>
                        <span className="text-gray-600">{item.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column - Contact Form */}
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h2>
                
                <form>
                  <div className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                        <input
                          type="text"
                          id="firstName"
                          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="Votre prénom"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                        <input
                          type="text"
                          id="lastName"
                          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="votre@email.fr"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone (optionnel)</label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Votre numéro de téléphone"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
                      <select
                        id="subject"
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="">Sélectionnez un sujet</option>
                        <option value="project">Projet citoyen</option>
                        <option value="partnership">Partenariat</option>
                        <option value="volunteer">Devenir bénévole</option>
                        <option value="media">Contact presse</option>
                        <option value="other">Autre demande</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea
                        id="message"
                        rows={6}
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Comment pouvons-nous vous aider ?"
                      ></textarea>
                    </div>
                    
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="privacy"
                        className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      />
                      <label htmlFor="privacy" className="ml-2 block text-sm text-gray-600">
                        J'accepte que mes données soient traitées conformément à la politique de confidentialité
                      </label>
                    </div>
                    
                    <div>
                      <button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-md flex items-center justify-center gap-2"
                      >
                        <span>Envoyer le message</span>
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>

          {/* Map Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Nous trouver</h2>
            
            {/* Map placeholder - in a real app, you'd integrate Google Maps or similar */}
            <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-emerald-600 mb-3 mx-auto" />
                <p className="text-lg font-medium text-gray-700">Carte interactive</p>
                <p className="text-gray-500">(Intégration Google Maps ou équivalent)</p>
              </div>
            </div>
          </section>

          {/* Regional Offices */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Nos bureaux régionaux</h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              {regionalOffices.map((office, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-emerald-700 mb-3">{office.city}</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-emerald-600 mt-1" />
                      <p className="text-gray-600 whitespace-pre-line">{office.address}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-emerald-600 mt-1" />
                      <p className="text-gray-600">{office.phone}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <div className="bg-emerald-50 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-8">
                <HelpCircle className="w-6 h-6 text-emerald-600" />
                <h2 className="text-2xl font-bold text-gray-900">Questions fréquentes</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {faqItems.map((item, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-3">{item.question}</h3>
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <a href="#" className="text-emerald-600 font-medium hover:text-emerald-700 flex items-center justify-center gap-2">
                  <span>Voir toutes les questions fréquentes</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>

          {/* Newsletter & Social Media */}
          <section>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Newsletter */}
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="w-6 h-6 text-emerald-600" />
                  <h2 className="text-xl font-bold text-gray-900">Restez informé</h2>
                </div>
                
                <p className="text-gray-600 mb-6">
                  Inscrivez-vous à notre newsletter pour suivre nos actualités et être informé des événements et opportunités de participation.
                </p>
                
                <form className="flex gap-3">
                  <input
                    type="email"
                    placeholder="Votre adresse email"
                    className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-md whitespace-nowrap">
                    S'abonner
                  </button>
                </form>
                
                <div className="mt-4 flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-1" />
                  <p className="text-sm text-gray-500 ml-2">
                    Vous recevrez un email par mois. Vous pourrez vous désabonner à tout moment.
                  </p>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <ExternalLink className="w-6 h-6 text-emerald-600" />
                  <h2 className="text-xl font-bold text-gray-900">Suivez-nous</h2>
                </div>
                
                <p className="text-gray-600 mb-6">
                  Rejoignez notre communauté sur les réseaux sociaux pour suivre nos actions et partager vos initiatives locales.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <a href="#" className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium">Facebook</span>
                      <p className="text-sm text-gray-500">11K abonnés</p>
                    </div>
                  </a>
                  
                  <a href="#" className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium">Twitter</span>
                      <p className="text-sm text-gray-500">8.5K abonnés</p>
                    </div>
                  </a>
                  
                  <a href="#" className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <svg className="w-6 h-6 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium">LinkedIn</span>
                      <p className="text-sm text-gray-500">4.2K abonnés</p>
                    </div>
                  </a>
                  
                  <a href="#" className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium">Instagram</span>
                      <p className="text-sm text-gray-500">15.3K abonnés</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </section>
          
        </div>
      </div>

    </div>
  );
};

export default ContactPage;