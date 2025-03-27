import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthService } from '../../services/Auth';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: ''
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Password strength check
    if (name === 'password') {
      let score = 0;
      let message = '';

      if (value.length >= 8) score += 1;
      if (/[A-Z]/.test(value)) score += 1;
      if (/[0-9]/.test(value)) score += 1;
      if (/[^A-Za-z0-9]/.test(value)) score += 1;

      switch(score) {
        case 0: message = 'Très faible'; break;
        case 1: message = 'Faible'; break;
        case 2: message = 'Moyen'; break;
        case 3: message = 'Fort'; break;
        case 4: message = 'Très fort'; break;
        default: message = '';
      }

      setPasswordStrength({ score, message });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Validation checks
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setShowModal(true);
      setIsLoading(false);
      return;
    }

    if (!formData.agreeTerms) {
      setError("Vous devez accepter les termes et conditions.");
      setShowModal(true);
      setIsLoading(false);
      return;
    }

    try {
      const authService = new AuthService();
      await authService.register(formData);
      
      setShowModal(true);
      setError("Inscription réussie ! Veuillez vérifier votre email pour activer votre compte.");
      
      setTimeout(() => {
        navigate('/connexion', { 
          state: { 
            message: "Veuillez vérifier votre email pour activer votre compte.",
            email: formData.email 
          } 
        });
      }, 3000);

    } catch (err) {
      let errorMessage = 'Une erreur s\'est produite lors de l\'inscription.';
      
      if (err.response) {
        switch (err.response.status) {
          case 400:
            errorMessage = 'Données invalides. Veuillez vérifier vos informations.';
            break;
          case 409:
            errorMessage = 'L\'email est déjà utilisé. Veuillez utiliser une autre adresse email.';
            break;
          case 500:
            errorMessage = 'Erreur serveur. Veuillez réessayer plus tard.';
            break;
          default:
            errorMessage = err.message || 'Une erreur inattendue s\'est produite.';
        }
      }

      setError(errorMessage);
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (error && error.includes('Inscription réussie')) {
      return;
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left section with background image (mobile hidden) */}
      <div className="hidden lg:block lg:w-1/2 bg-blue-900 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/src/assets/bg1.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-blue-800/40"></div>
        </div>
      </div>

      {/* Registration Form */}
      <div className="flex-1 flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-6 p-4">
            <img src="/src/assets/logo.png" alt="iaparibot" className="h-12 sm:h-14" />
          </div>
          
          <h2 className="text-center text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-2">
            Créer un compte
          </h2>
          <p className="text-center text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
            Rejoignez iaparibot et commencez à parier intelligemment
          </p>

          {/* Error/Success Modal */}
          {showModal && error && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md">
                <h3 className={`text-lg sm:text-xl ${error.includes('Inscription réussie') ? 'text-green-500' : 'text-red-500'}`}>
                  {error.includes('Inscription réussie') ? 'Succès' : 'Erreur'}
                </h3>
                <p className="text-gray-700 mt-2 text-sm sm:text-base">{error}</p>
                <button
                  onClick={handleCloseModal}
                  className={`mt-4 w-full font-bold py-2 px-4 rounded-md text-sm sm:text-base ${
                    error.includes('Inscription réussie') 
                    ? 'bg-green-500 hover:bg-green-700 text-white' 
                    : 'bg-red-500 hover:bg-red-700 text-white'
                  }`}
                >
                  {error.includes('Inscription réussie') ? 'Ok' : 'Fermer'}
                </button>
              </div>
            </div>
          )}

          <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
              <div>
                <label htmlFor="firstName" className="block text-xs sm:text-sm font-medium text-gray-700">
                  Prénom
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 sm:py-3 px-2 sm:px-3 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-xs sm:text-sm font-medium text-gray-700">
                  Nom
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 sm:py-3 px-2 sm:px-3 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700">
                Adresse email
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="exemple@iaparibot.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-8 sm:pl-10 pr-2 sm:pr-3 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Password Fields */}
            <div>
              <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-8 sm:pl-10 pr-10 py-2 sm:py-3 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center text-gray-500 text-sm"
                >
                  {showPassword ? 'Cacher' : 'Afficher'}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-xs sm:text-sm font-medium text-gray-700">
                Confirmer le mot de passe
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full py-2 sm:py-3 px-2 sm:px-3 border border-gray-300 rounded-md shadow-sm text-sm sm:text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input
                id="agreeTerms"
                name="agreeTerms"
                type="checkbox"
                required
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
              />
              <label htmlFor="agreeTerms" className="text-xs sm:text-sm text-gray-700">
                J'accepte les <span className="text-blue-600 ml-1">termes et conditions</span>
              </label>
            </div>

            {/* Password Strength Indicator */}
            <div className="text-xs sm:text-sm text-gray-500 mt-2">
              <span>Force du mot de passe: {passwordStrength.message}</span>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 px-4 rounded-md text-sm sm:text-base"
              >
                {isLoading ? 'Chargement...' : 'S\'inscrire'}
              </button>
            </div>

            {/* Login Link */}
            <p className="text-center text-xs sm:text-sm text-gray-500">
              Vous avez déjà un compte?{' '}
              <Link to="/connexion" className="font-semibold text-blue-600 hover:text-blue-800">
                Se connecter
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;