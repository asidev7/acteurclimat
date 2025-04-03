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

  // Handling functions remain the same
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

  // Benefits array for displaying value propositions
  const benefits = [
    {
      icon: (
        <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      text: "Prédictions IA avec 85% de précision"
    },
    {
      icon: (
        <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      text: "ROI moyen de 28% pour nos membres"
    },
    {
      icon: (
        <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      text: "Analyses en temps réel et conseils personnalisés"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left section with background image and eye-catching banner */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-900 relative flex-col justify-center items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/src/assets/bg1.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/60"></div>
        </div>
        
        {/* Banner content */}
        <div className="relative z-10 px-8 py-12 text-white max-w-lg">
          <h1 className="text-4xl font-bold mb-6">Révolutionnez vos paris sportifs</h1>
          <p className="text-xl mb-8">Notre IA analyse des millions de données pour vous offrir les meilleures prédictions sportives du marché.</p>
          
          {/* Stats section */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-300">85%</div>
              <div className="text-sm">taux de réussite</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-300">+28%</div>
              <div className="text-sm">ROI moyen</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-300">24/7</div>
              <div className="text-sm">analyses en direct</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-300">10K+</div>
              <div className="text-sm">utilisateurs satisfaits</div>
            </div>
          </div>
          
          {/* Testimonial */}
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <p className="italic text-blue-100 mb-2">"Depuis que j'utilise iaparibot, mes gains ont doublé. Leurs prédictions sont incroyablement précises."</p>
            <p className="text-sm text-blue-200">— Thomas D., membre depuis 2023</p>
          </div>
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
            Rejoignez la révolution des paris
          </h2>
          <p className="text-center text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
            Créez votre compte et commencez à gagner intelligemment
          </p>

          {/* Benefits for mobile users */}
          <div className="mb-6 lg:hidden">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Pourquoi nous choisir ?</h3>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 mt-0.5">{benefit.icon}</span>
                    <span className="text-sm text-gray-700">{benefit.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

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

            {/* Password Strength Indicator with visual cue */}
            <div className="mt-1">
              <div className="text-xs sm:text-sm text-gray-500 mb-1">
                Force du mot de passe: <span className={
                  passwordStrength.score === 0 ? "text-red-500" :
                  passwordStrength.score === 1 ? "text-orange-500" :
                  passwordStrength.score === 2 ? "text-yellow-500" :
                  passwordStrength.score === 3 ? "text-green-500" :
                  "text-green-600 font-semibold"
                }>{passwordStrength.message}</span>
              </div>
              <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    passwordStrength.score === 0 ? "bg-red-500 w-0" :
                    passwordStrength.score === 1 ? "bg-orange-500 w-1/4" :
                    passwordStrength.score === 2 ? "bg-yellow-500 w-2/4" :
                    passwordStrength.score === 3 ? "bg-green-500 w-3/4" :
                    "bg-green-600 w-full"
                  }`}
                ></div>
              </div>
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
                J'accepte les <span className="text-blue-600 cursor-pointer hover:underline">termes et conditions</span>
              </label>
            </div>

            {/* Submit Button with gradient */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-3 px-4 rounded-md text-sm sm:text-base transition duration-300 transform hover:scale-[1.02] shadow-md"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Chargement...
                  </span>
                ) : "Commencer à gagner maintenant"}
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex justify-center space-x-4 py-2">
              <div className="text-xs text-gray-500 flex items-center">
                <svg className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Sécurisé
              </div>
              <div className="text-xs text-gray-500 flex items-center">
                <svg className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Confidentiel
              </div>
              <div className="text-xs text-gray-500 flex items-center">
                <svg className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Remboursement
              </div>
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