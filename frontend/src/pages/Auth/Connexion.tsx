import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/Auth';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState('');
  const [redirectMessage, setRedirectMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const authService = new AuthService();

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Efface l'erreur lorsque l'utilisateur commence à modifier les champs
    setError('');
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // Vérification que la soumission n'est pas déjà en cours
    if (isLoading) return;

    // Réinitialisation des messages
    setError('');
    setRedirectMessage('');

    // Validation des champs
    if (!formData.email.trim()) {
      setError('Veuillez saisir votre email');
      return;
    }
    if (!formData.password.trim()) {
      setError('Veuillez saisir votre mot de passe');
      return;
    }

    // Début du chargement
    setIsLoading(true);

    try {
      // Tentative de connexion
      const response = await authService.login(formData);
      
      // Succès de la connexion
      setRedirectMessage('Connexion réussie, redirection en cours...');
      
      // Redirection différée
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);

    } catch (err) {
      // Gestion des erreurs de connexion
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Une erreur inattendue est survenue';
      
      setError(errorMessage);
    } finally {
      // Fin du chargement
      setIsLoading(false);
    }
  }, [formData, isLoading, navigate, authService]);

  // Validation du formulaire
  const isFormValid = formData.email.trim() && formData.password.trim();

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Section image de fond */}
      <div className="hidden md:block md:w-1/2 bg-blue-900 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/src/assets/bg2.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-blue-800/40"></div>
        </div>
      </div>

      {/* Formulaire de connexion */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-10">
            <img src="/src/assets/logo.png" alt="iaparibot" className="h-14" />
          </div>

          {/* Titre et sous-titre */}
          <h2 className="text-center text-3xl font-bold text-gray-900 mb-2">
            Bienvenue sur iaparibot
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Gestion sécurisée de vos transactions financières
          </p>

          {/* Gestion des messages d'erreur */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded animate-pulse">
              <strong>Erreur : </strong>{error}
            </div>
          )}

          {/* Message de redirection */}
          {redirectMessage && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              <strong>Succès : </strong>{redirectMessage}
            </div>
          )}

          {/* Formulaire de connexion */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Champ Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adresse email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="exemple@iaparibot.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className={`block w-full px-3 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              />
            </div>

            {/* Champ Mot de passe */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                className={`block w-full px-3 py-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              />
            </div>

            {/* Options supplémentaires */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                  Se souvenir de moi
                </label>
              </div>

              <Link 
                to="/reset-password" 
                className={`text-sm text-blue-600 hover:text-blue-500 ${
                  isLoading ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                Mot de passe oublié ?
              </Link>
            </div>

            {/* Bouton de connexion */}
            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className={`w-full py-3 text-white rounded-md text-sm font-medium 
                ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
                ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>

          {/* Lien d'inscription */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Vous n'avez pas de compte ?{' '}
            <Link 
              to="/inscription" 
              className={`text-blue-600 hover:text-blue-500 ${
                isLoading ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              Inscrivez-vous ici
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;