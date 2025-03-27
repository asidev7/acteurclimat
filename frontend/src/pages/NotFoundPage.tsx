import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16">
      {/* Icon with size 59px */}
      <div className="mb-8 text-center">
        <span className="text-6xl" style={{ fontSize: '59px' }}>😵</span>
        <h1 className="mt-4 text-4xl font-bold text-gray-800">Oouufs!</h1>
      </div>
      
      <div className="max-w-md text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Page introuvable
        </h2>
        <p className="text-gray-600 mb-6">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        
        {/* Error code */}
        <div className="inline-block py-2 px-6 bg-gray-200 rounded-full text-gray-700 font-medium mb-8">
          Erreur 404
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          to="/" 
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retour à l'accueil
        </Link>
        <button 
          onClick={() => window.history.back()} 
          className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          Page précédente
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;