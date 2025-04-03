import React from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Breadcrumb Banner */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm mb-4">
            <a href="/" className="hover:text-blue-200 transition">Accueil</a>
            <ChevronDown size={16} className="mx-2" />
            <span className="font-medium">FAQ - Questions Fréquentes</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center">FAQ - Questions Fréquentes</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto text-center">
            Trouvez ici les réponses à vos questions concernant iaparibot et nos services.
          </p>
        </div>
      </div>

      {/* FAQ Section: iaparibot */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-16">
          <h2 className="text-3xl font-semibold text-center mb-8">À propos de iaparibot</h2>
          <div className="space-y-6">
            <div className="border-b pb-4">
              <button className="flex justify-between w-full text-left text-lg font-medium text-gray-900 hover:text-blue-600">
                Qu'est-ce que iaparibot ?
                <ChevronDown size={20} className="transition-transform transform rotate-0 group-hover:rotate-180" />
              </button>
              <div className="mt-4 text-gray-700">
                iaparibot est une plateforme de prédiction pour les paris sportifs. Nous fournissons des analyses de données avancées pour aider les utilisateurs à prendre des décisions éclairées lors de leurs paris.
              </div>
            </div>
            <div className="border-b pb-4">
              <button className="flex justify-between w-full text-left text-lg font-medium text-gray-900 hover:text-blue-600">
                Comment fonctionne iaparibot ?
                <ChevronDown size={20} className="transition-transform transform rotate-0 group-hover:rotate-180" />
              </button>
              <div className="mt-4 text-gray-700">
                iaparibot utilise des algorithmes d'intelligence artificielle pour analyser les données historiques des matchs et prévoir les résultats des paris sportifs.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section: Abonnement */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 md:px-16">
          <h2 className="text-3xl font-semibold text-center mb-8">Abonnement</h2>
          <div className="space-y-6">
            <div className="border-b pb-4">
              <button className="flex justify-between w-full text-left text-lg font-medium text-gray-900 hover:text-blue-600">
                Quels sont les plans d'abonnement disponibles ?
                <ChevronDown size={20} className="transition-transform transform rotate-0 group-hover:rotate-180" />
              </button>
              <div className="mt-4 text-gray-700">
                iaparibot propose plusieurs plans d'abonnement adaptés à vos besoins, incluant un abonnement mensuel et annuel, avec des avantages différents selon le plan choisi.
              </div>
            </div>
            <div className="border-b pb-4">
              <button className="flex justify-between w-full text-left text-lg font-medium text-gray-900 hover:text-blue-600">
                Comment puis-je m'abonner ?
                <ChevronDown size={20} className="transition-transform transform rotate-0 group-hover:rotate-180" />
              </button>
              <div className="mt-4 text-gray-700">
                Vous pouvez vous abonner directement sur notre plateforme en créant un compte, puis en choisissant le plan d'abonnement qui vous convient.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section: Matches */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-16">
          <h2 className="text-3xl font-semibold text-center mb-8">Les Matchs</h2>
          <div className="space-y-6">
            <div className="border-b pb-4">
              <button className="flex justify-between w-full text-left text-lg font-medium text-gray-900 hover:text-blue-600">
                Quels types de matchs sont analysés par iaparibot ?
                <ChevronDown size={20} className="transition-transform transform rotate-0 group-hover:rotate-180" />
              </button>
              <div className="mt-4 text-gray-700">
                iaparibot analyse une large gamme de matchs sportifs, y compris les compétitions de football, basketball, tennis, et autres sports populaires.
              </div>
            </div>
            <div className="border-b pb-4">
              <button className="flex justify-between w-full text-left text-lg font-medium text-gray-900 hover:text-blue-600">
                Comment puis-je consulter les prédictions des matchs ?
                <ChevronDown size={20} className="transition-transform transform rotate-0 group-hover:rotate-180" />
              </button>
              <div className="mt-4 text-gray-700">
                Vous pouvez consulter les prédictions directement sur notre tableau de bord une fois que vous êtes abonné et connecté à votre compte.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section: Nos Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 md:px-16">
          <h2 className="text-3xl font-semibold text-center mb-8">Nos Services</h2>
          <div className="space-y-6">
            <div className="border-b pb-4">
              <button className="flex justify-between w-full text-left text-lg font-medium text-gray-900 hover:text-blue-600">
                Quels services proposez-vous ?
                <ChevronDown size={20} className="transition-transform transform rotate-0 group-hover:rotate-180" />
              </button>
              <div className="mt-4 text-gray-700">
                Nous proposons des services de prédiction des paris sportifs, de conseils en stratégie de paris, ainsi que des analyses approfondies sur les tendances des matchs.
              </div>
            </div>
            <div className="border-b pb-4">
              <button className="flex justify-between w-full text-left text-lg font-medium text-gray-900 hover:text-blue-600">
                Comment bénéficier de vos services ?
                <ChevronDown size={20} className="transition-transform transform rotate-0 group-hover:rotate-180" />
              </button>
              <div className="mt-4 text-gray-700">
                Vous pouvez bénéficier de nos services en vous abonnant à l'un de nos plans et en utilisant la plateforme pour accéder aux prédictions et conseils.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
