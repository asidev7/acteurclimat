import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-indigo-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* À propos */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-indigo-200">À propos</h3>
            <p className="text-indigo-100">
              Notre plateforme vous aide à faire les meilleures prédictions sportives 
              basées sur des analyses de données avancées.
            </p>
          </div>
          
          {/* Liens rapides */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-indigo-200">Liens rapides</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-indigo-100 hover:text-white transition-colors hover:underline">Accueil</Link></li>
              <li><Link to="/pricing" className="text-indigo-100 hover:text-white transition-colors hover:underline">Prédictions</Link></li>
              <li><Link to="/how-it-works" className="text-indigo-100 hover:text-white transition-colors hover:underline">Comment ça marche</Link></li>
              <li><Link to="/contact" className="text-indigo-100 hover:text-white transition-colors hover:underline">Contact</Link></li>
            </ul>
          </div>
          
          {/* Légal */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-indigo-200">Légal</h3>
            <ul className="space-y-2">
              <li><Link to="/cgu" className="text-indigo-100 hover:text-white transition-colors hover:underline">Conditions d'utilisation</Link></li>
              <li><Link to="/#" className="text-indigo-100 hover:text-white transition-colors hover:underline">Politique de confidentialité</Link></li>
              <li><Link to="/#" className="text-indigo-100 hover:text-white transition-colors hover:underline">Politique de cookies</Link></li>
            </ul>
          </div>
          
          {/* Nous contacter */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-indigo-200">Réseaux sociaux</h3>
            <ul className="flex space-x-4">
              <li>
                <a href="https://facebook.com/iaparibot" className="bg-indigo-800 hover:bg-indigo-700 text-white p-3 rounded-full transition-colors block" target="_blank" rel="noopener noreferrer">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://t.me/iaparibotpro" className="bg-indigo-800 hover:bg-indigo-700 text-white p-3 rounded-full transition-colors block" target="_blank" rel="noopener noreferrer">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21.77 3.343c-.313-.256-.747-.298-1.104-.107L2.35 12.323c-.442.234-.688.723-.62 1.22s.423.913.89 1.058l4.775 1.463c.325.1.677.044.958-.15l2.682-1.81 3.503 2.878c.202.166.454.251.71.245s.504-.106.694-.283l4.02-3.838c.27-.256.415-.613.4-.983-.014-.37-.18-.716-.457-.964l-3.205-2.91 4.217-3.112c.364-.267.505-.74.341-1.159s-.58-.65-1.038-.657h-.002zM7.26 14.506l-.345-2.756 7.53-4.644-3.708 7.13-3.478.27z"></path>
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@IAPARIBOT" className="bg-indigo-800 hover:bg-indigo-700 text-white p-3 rounded-full transition-colors block" target="_blank" rel="noopener noreferrer">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.546 15.569V8.431L15.818 12l-6.272 3.569z"></path>
                  </svg>
                </a>
              </li>
              <li>
                <a href="mailto:contact@iaparibot.pro" className="bg-indigo-800 hover:bg-indigo-700 text-white p-3 rounded-full transition-colors block" target="_blank" rel="noopener noreferrer">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.465 5.69a2.25 2.25 0 01-2.57 0L1.5 8.67z"></path>
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 6.525a2.25 2.25 0 002.572 0L22.5 6.908z"></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-indigo-800 mt-8 pt-6 text-center">
          <p className="text-indigo-200">© {currentYear} IA PARIBOT. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;