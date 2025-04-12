import React, { useState } from 'react';
import { 
  ChevronRight, 
  Send, 
  FileText,
  Save
} from 'lucide-react';

const SimpleProjectSubmissionForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Biodiversité',
    location: '',
    budget: '',
    contact: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Catégories de projets
  const categories = ['Biodiversité', 'Énergie', 'Mobilité Douce', 'Zéro Déchet', 'Agriculture'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveToOnlineExcel = async () => {
    setIsSubmitting(true);
    
    try {
      // Dans un environnement réel, vous utiliseriez une API comme Microsoft Graph API
      // pour Excel Online ou Google Sheets API
      
      // Simulation d'appel API pour l'exemple
      console.log("Enregistrement des données dans Excel Online:", formData);
      
      // Simuler un délai de traitement
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSuccess(true);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
      alert("Une erreur est survenue lors de l'enregistrement du projet.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveToOnlineExcel();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center text-sm">
            <a href="/" className="text-emerald-600 hover:text-emerald-700">Accueil</a>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <span className="text-gray-600 font-medium">Soumettre un Projet</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-emerald-700 py-6">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-xl md:text-2xl font-bold text-white">
            Demande de Financement de Projet
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            {isSuccess ? (
              <div className="text-center py-6">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="text-emerald-600" size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">Projet Soumis avec Succès!</h2>
                <p className="text-gray-600 mb-4">
                  Votre projet a été enregistré dans notre document Excel en ligne.
                </p>
                <div className="flex justify-center gap-4">
                  <button 
                    onClick={() => {
                      setFormData({
                        title: '',
                        description: '',
                        category: 'Biodiversité',
                        location: '',
                        budget: '',
                        contact: ''
                      });
                      setIsSuccess(false);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
                  >
                    Soumettre un autre projet
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Informations du Projet</h2>
                  
                  {/* Titre du projet */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="title">
                      Titre du projet *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Entrez le titre de votre projet"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>
                  
                  {/* Description */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">
                      Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows="3"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Décrivez votre projet en quelques lignes"
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  
                  {/* Catégorie */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="category">
                      Catégorie *
                    </label>
                    <select
                      id="category"
                      name="category"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Localisation */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="location">
                      Localisation *
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Ville, Région"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                  
                  {/* Budget */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="budget">
                      Budget estimé (€) *
                    </label>
                    <input
                      type="text"
                      id="budget"
                      name="budget"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Ex: 5000"
                      value={formData.budget}
                      onChange={handleChange}
                    />
                  </div>
                  
                  {/* Contact */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="contact">
                      Email de contact *
                    </label>
                    <input
                      type="email"
                      id="contact"
                      name="contact"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="votre@email.com"
                      value={formData.contact}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                {/* Message info */}
                <div className="bg-blue-50 p-3 rounded mb-6 flex items-start">
                  <FileText className="text-blue-500 flex-shrink-0 mt-1 mr-2" size={16} />
                  <p className="text-sm text-blue-700">
                    Votre projet sera enregistré dans notre document Excel en ligne pour analyse par notre équipe.
                  </p>
                </div>
                
                {/* Boutons d'action */}
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                    onClick={() => window.history.back()}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 flex items-center gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white"></div>
                        <span>Enregistrement...</span>
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        <span>Envoyer la demande</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleProjectSubmissionForm;