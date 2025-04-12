import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-emerald-800 text-white py-6">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p>&copy; 2025 OhClimat - Tous droits réservés</p>
        <div className="mt-2 flex justify-center space-x-4 text-sm">
          <a href="/mentions-legales" className="text-emerald-200 hover:text-white">Mentions légales</a>
          <a href="/politique-confidentialite" className="text-emerald-200 hover:text-white">Politique de confidentialité</a>
          <a href="/accessibilite" className="text-emerald-200 hover:text-white">Accessibilité</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;