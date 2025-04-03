import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const apiUrl = 'http://127.0.0.1:8000/contact/';

    axios.post(apiUrl, formData)
      .then((response) => {
        if (response.status === 200) {
          setSubmitted(true);
          setFormData({ first_name: '', last_name: '', email: '', phone: '', message: '' });
          setErrorMessage('');  // Reset error message after success
        }
      })
      .catch((error) => {
        setErrorMessage('Une erreur est survenue. Veuillez réessayer plus tard.');
      });
  };

  const contactChannels = [
    {
      name: "Email",
      icon: "✉️",
      color: "bg-blue-600",
      link: "mailto:contact@iaparibot.com",
    },
    {
      name: "Telegram",
      icon: "📨",
      color: "bg-blue-500",
      link: "https://t.me/iaparibot",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm mb-4">
            <Link to="/" className="hover:text-blue-200 transition">Accueil</Link>
            <span className="mx-2">›</span>
            <span className="font-medium">Contact</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Contactez-nous</h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            Notre équipe est à votre disposition pour répondre à vos questions
          </p>
        </div>
      </div>

      {/* Section Formulaire de Contact */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-8">
            {/* Formulaire - prend plus d'espace */}
            <div className="md:col-span-3 bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
              
              {submitted ? (
                <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg">
                  <p className="font-medium">Message envoyé avec succès !</p>
                  <p className="mt-2">Nous vous répondrons dans les plus brefs délais.</p>
                  <button 
                    className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
                    onClick={() => setSubmitted(false)}
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {errorMessage && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4">
                      <p>{errorMessage}</p>
                    </div>
                  )}
                  <div className="mb-4">
                    <label htmlFor="first_name" className="block text-gray-700 mb-2">Prénom</label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      placeholder="Votre prénom"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="last_name" className="block text-gray-700 mb-2">Nom de famille</label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      placeholder="Votre nom de famille"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      placeholder="votre@email.com"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700 mb-2">Téléphone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      placeholder="+22990909090"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      placeholder="Votre message..."
                      required
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                  >
                    Envoyer le message
                  </button>
                </form>
              )}
            </div>
            
            {/* Contact direct - colonne plus étroite */}
            <div className="md:col-span-2 space-y-4">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold mb-4">Contact direct</h3>
                <div className="space-y-4">
                  {contactChannels.map((channel, index) => (
                    <a 
                      href={channel.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      key={index} 
                      className="flex items-center group hover:bg-gray-50 p-2 rounded-lg transition-all"
                    >
                      <div className={`${channel.color} h-10 w-10 flex items-center justify-center rounded-lg`}>
                        <span className="text-white text-lg">{channel.icon}</span>
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium">{channel.name}</h4>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section FAQ */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold text-center mb-8">Questions fréquentes</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-5 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Quel est le délai de réponse habituel ?</h3>
              <p className="text-gray-600">
                Nous nous efforçons de répondre à toutes les demandes dans un délai de 24 heures ouvrables. 
                Les abonnés bénéficient d'un support prioritaire.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-5 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Comment puis-je suivre ma demande ?</h3>
              <p className="text-gray-600">
                Vous recevrez une confirmation par email avec un numéro de référence pour suivre votre demande.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;