import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";

// Option 1: Importation avec chemin absolu
import logo from "/src/assets/logo.png";

const Header = () => {
  // État pour gérer l'ouverture/fermeture du menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fonction pour basculer l'état du menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center p-4">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-10" />
        </Link>

        {/* Menu Hamburger (visible uniquement sur mobile) */}
        <button 
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded hover:bg-gray-100"
          onClick={toggleMenu}
          aria-label="Menu principal"
        >
          <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : 'mb-1.5'}`}></span>
          <span className={`block w-6 h-0.5 bg-gray-700 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'mb-1.5'}`}></span>
          <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>

        {/* Navigation principale */}
        <nav className={`
          lg:flex 
          ${isMenuOpen ? 'block' : 'hidden'} 
          lg:static absolute top-16 py-4 left-0 right-0 
          bg-white lg:bg-transparent 
          lg:shadow-none shadow-md 
          lg:w-auto w-full 
          transition-all duration-300
        `}>
          <ul className="lg:flex lg:space-x-6 p-4 lg:p-0">
            <li className="py-2 lg:py-0">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive 
                    ? "font-bold text-blue-800 p-4 block py-2 lg:py-0" 
                    : "text-gray-700 hover:text-blue-500 block py-2 lg:py-0"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </NavLink>
            </li>
            <li className="py-2 lg:py-0">
              <NavLink
                to="/predictions"
                className={({ isActive }) =>
                  isActive 
                    ? "font-bold text-blue-800 p-4 block py-2 lg:py-0" 
                    : "text-gray-700 hover:text-blue-500 block py-2 lg:py-0"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Prédictions
              </NavLink>
            </li>
            <li className="py-2 lg:py-0">
              <NavLink
                to="/how-it-works"
                className={({ isActive }) =>
                  isActive 
                    ? "font-bold text-blue-800 p-4 block py-2 lg:py-0" 
                    : "text-gray-700 hover:text-blue-500 block py-2 lg:py-0"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Comment ça marche
              </NavLink>
            </li>
            <li className="py-2 lg:py-0">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive 
                    ? "font-bold text-blue-800 p-4 block py-2 lg:py-0" 
                    : "text-gray-700 hover:text-blue-500 block py-2 lg:py-0"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Bouton de connexion */}
        <div className="hidden lg:block">
          <Link
            to="/connexion"
            className="bg-blue-800 py-3 mb-3 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
          >
            Connexion
          </Link>
        </div>

        {/* Bouton de connexion pour mobile (affiché dans le menu déroulant) */}
        <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} p-4 border-t mt-2`}>
          <Link
            to="/connexion"
            className="bg-blue-800 p-4 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 block text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            Connexion
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;