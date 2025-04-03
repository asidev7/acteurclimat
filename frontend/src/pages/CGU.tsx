import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const CGU = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Breadcrumb Banner */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm mb-4">
            <Link to="/" className="hover:text-blue-200 transition">Accueil</Link>
            <ChevronRight size={16} className="mx-2" />
            <span className="font-medium">Conditions Générales d'Utilisation</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center">Conditions Générales d'Utilisation</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto text-center">
            Lisez attentivement nos conditions d'utilisation avant d'utiliser notre plateforme.
          </p>
        </div>
      </div>

      {/* Section: Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-16">
          <h2 className="text-3xl font-semibold text-center mb-8">Introduction</h2>
          <p className="text-gray-700 leading-relaxed text-lg text-justify max-w-4xl mx-auto">
            Ces Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation de la plateforme iaparibot.
            En utilisant notre service, vous acceptez ces conditions. Si vous n'acceptez pas ces termes, vous ne devez pas utiliser nos services.
          </p>
        </div>
      </section>

      {/* Section: Acceptation des Conditions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 md:px-16">
          <h2 className="text-3xl font-semibold text-center mb-8">Acceptation des Conditions</h2>
          <p className="text-gray-700 leading-relaxed text-lg text-justify max-w-4xl mx-auto">
            En accédant ou en utilisant la plateforme iaparibot, vous acceptez de vous conformer à ces CGU et vous reconnaissez
            avoir la capacité juridique nécessaire pour les accepter. Si vous êtes un mineur, vous devez obtenir l'autorisation
            de vos parents ou tuteurs légaux pour utiliser nos services.
          </p>
        </div>
      </section>

      {/* Section: Utilisation de la Plateforme */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-16">
          <h2 className="text-3xl font-semibold text-center mb-8">Utilisation de la Plateforme</h2>
          <p className="text-gray-700 leading-relaxed text-lg text-justify max-w-4xl mx-auto">
            iaparibot est une plateforme de prédictions pour les paris sportifs. Vous pouvez utiliser notre service uniquement dans
            le cadre des activités légales et conformément à nos directives.
          </p>
        </div>
      </section>

      {/* Section: Responsabilité de l'Utilisateur */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 md:px-16">
          <h2 className="text-3xl font-semibold text-center mb-8">Responsabilité de l'Utilisateur</h2>
          <p className="text-gray-700 leading-relaxed text-lg text-justify max-w-4xl mx-auto">
            L'utilisateur est responsable de ses actions sur la plateforme. iaparibot ne peut être tenu responsable des pertes ou
            des dommages résultant d'une mauvaise utilisation des informations fournies sur la plateforme.
          </p>
        </div>
      </section>

      {/* Section: Abonnement et Paiement */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-16">
          <h2 className="text-3xl font-semibold text-center mb-8">Abonnement et Paiement</h2>
          <p className="text-gray-700 leading-relaxed text-lg text-justify max-w-4xl mx-auto">
            iaparibot propose différents plans d'abonnement. En souscrivant à un abonnement, vous acceptez de payer les frais
            selon le plan choisi. Tous les paiements sont effectués par les moyens proposés sur la plateforme.
          </p>
        </div>
      </section>

      {/* Section: Confidentialité et Protection des Données */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 md:px-16">
          <h2 className="text-3xl font-semibold text-center mb-8">Confidentialité et Protection des Données</h2>
          <p className="text-gray-700 leading-relaxed text-lg text-justify max-w-4xl mx-auto">
            Nous respectons votre vie privée. Vos informations personnelles sont collectées uniquement dans le cadre de la
            fourniture de nos services. Veuillez consulter notre politique de confidentialité pour plus de détails.
          </p>
        </div>
      </section>

      {/* Section: Modifications des CGU */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-16">
          <h2 className="text-3xl font-semibold text-center mb-8">Modifications des CGU</h2>
          <p className="text-gray-700 leading-relaxed text-lg text-justify max-w-4xl mx-auto">
            iaparibot se réserve le droit de modifier ces conditions à tout moment. Les modifications seront publiées sur cette
            page, et vous serez informé des changements effectués. Il est de votre responsabilité de consulter régulièrement les
            CGU.
          </p>
        </div>
      </section>

      {/* Section: Limitation de Responsabilité */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 md:px-16">
          <h2 className="text-3xl font-semibold text-center mb-8">Limitation de Responsabilité</h2>
          <p className="text-gray-700 leading-relaxed text-lg text-justify max-w-4xl mx-auto">
            En aucun cas iaparibot ne sera responsable des dommages indirects, spéciaux, ou punitifs résultant de l'utilisation
            de la plateforme. Nos services sont fournis "tels quels" et nous ne garantissons pas l'exactitude ou la disponibilité
            des informations fournies.
          </p>
        </div>
      </section>

      {/* Section: Loi Applicable */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-16">
          <h2 className="text-3xl font-semibold text-center mb-8">Loi Applicable</h2>
          <p className="text-gray-700 leading-relaxed text-lg text-justify max-w-4xl mx-auto">
            Ces CGU sont régies par les lois en vigueur dans le pays où iaparibot est exploité. En cas de litige, les parties
            conviennent de soumettre le différend à la juridiction compétente.
          </p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à optimiser vos paris sportifs ?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Rejoignez notre communauté et commencez à utiliser l'analyse de données pour améliorer vos paris.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/connexion"
              className="bg-white text-blue-800 hover:bg-blue-100 py-3 px-8 rounded-lg font-bold transition-colors"
            >
              Créer un compte
            </Link>
            <Link
              to="/predictions"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 py-3 px-8 rounded-lg font-bold transition-colors"
            >
              Voir les prédictions du jour
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CGU;
