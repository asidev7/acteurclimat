import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-green-600">OHCLIMAT</span>
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

        {/* Navigation */}
        <nav className={`lg:flex gap-6 items-center ${isMenuOpen ? 'block' : 'hidden'} absolute lg:static top-16 left-0 right-0 bg-white lg:bg-transparent p-4 lg:p-0 shadow-lg lg:shadow-none`}>
          <div className="lg:flex lg:gap-6 lg:items-center p-2">
            
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block py-3 px-1 lg:py-0 ${isActive ? 'text-green-600 font-bold' : 'text-gray-900 hover:text-green-500'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil 
            </NavLink>
            <NavLink
              to="/nos-projets"
              className={({ isActive }) =>
                `block py-3 px-1 lg:py-0 ${isActive ? 'text-green-600 font-bold' : 'text-gray-900 hover:text-green-500'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Nos projets
            </NavLink>

            <NavLink
              to="/ressources"
              className={({ isActive }) =>
                `block py-3 px-1 lg:py-0 ${isActive ? 'text-green-600 font-bold' : 'text-gray-900 hover:text-green-500'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Ressources
            </NavLink>

            <NavLink
              to="/a-propos"
              className={({ isActive }) =>
                `block py-3 px-1 lg:py-0 ${isActive ? 'text-green-600 font-bold' : 'text-gray-900 hover:text-green-500'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Qui sommes-nous
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `block py-3 px-1 lg:py-0 ${isActive ? 'text-green-600 font-bold' : 'text-gray-900 hover:text-green-500'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </NavLink>

            {/* CTA Buttons */}
            <div className="mt-4 lg:mt-0 lg:ml-4 flex flex-col lg:flex-row gap-2">
              <Link
                to="https://me.fedapay.com/VRfc2aYJ"
                className="bg-green-600 hover:bg-green-500 text-white font-medium py-2 px-4 rounded-lg text-center transition duration-300 block"
                onClick={() => setIsMenuOpen(false)}
              >
                Faire un don
              </Link>

              <Link
                to="/soumettre-projet"
                className="border border-green-600 text-green-600 hover:bg-green-100 font-medium py-2 px-4 rounded-lg text-center transition duration-300 block"
                onClick={() => setIsMenuOpen(false)}
              >
                Soumettre un projet
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
