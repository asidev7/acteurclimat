import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import logo from "/src/assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-10" />
        </Link>

        {/* Menu Hamburger */}
        <button 
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded hover:bg-gray-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu principal"
        >
          <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : 'mb-1.5'}`}></span>
          <span className={`block w-6 h-0.5 bg-gray-700 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'mb-1.5'}`}></span>
          <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>

        {/* Navigation principale */}
        <nav className={`lg:flex gap-6 items-center ${isMenuOpen ? 'block' : 'hidden'} absolute lg:static top-16 left-0 right-0 bg-white lg:bg-transparent p-4 lg:p-0 shadow-lg lg:shadow-none`}>
          <div className="lg:flex lg:gap-6 lg:items-center">
            {/* Liens */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block py-2 lg:py-0 ${isActive ? 'text-blue-800 font-bold' : 'text-gray-700 hover:text-blue-500'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </NavLink>
            
            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                `block py-2 lg:py-0 ${isActive ? 'text-blue-800 font-bold' : 'text-gray-700 hover:text-blue-500'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Formules
            </NavLink>
            
            <NavLink
              to="/how-it-works"
              className={({ isActive }) =>
                `block py-2 lg:py-0 ${isActive ? 'text-blue-800 font-bold' : 'text-gray-700 hover:text-blue-500'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Comment ça marche
            </NavLink>
            
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `block py-2 lg:py-0 ${isActive ? 'text-blue-800 font-bold' : 'text-gray-700 hover:text-blue-500'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </NavLink>

            


            {/* Boutons */}
            <div className="flex flex-col lg:flex-row gap-2 mt-4 lg:mt-0">
              <Link
                to="/connexion"
                className="bg-blue-800 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-center transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Connexion
              </Link>
              <Link
                to="/inscription"
                className="bg-green-600 hover:bg-green-500 text-white font-medium py-2 px-4 rounded-lg text-center transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Inscription
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;