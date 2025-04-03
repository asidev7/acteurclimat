import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import Layout from './layouts/Layout';
import DashboardLayout from './layouts/DashboardLayout';
import LayoutAuth from './layouts/LayoutAuth';

// Main pages
import HomePage from './pages/HomePages';
import HowItWorksPage from './pages/HowItWorksPage';
import ContactPage from './pages/ContactPage';
import AboutPages from './pages/AboutPages';
import PricingPages from './pages/PricingPages';
import DocPages from './pages/DocPages';
import CGU from './pages/CGU';
import FAQ from './pages/FAQ';

import NotFoundPage from './pages/NotFoundPage';

// Dashboard pages
import Abonnement from './pages/dashboard/Abonnement';
import Analyse from './pages/dashboard/Analyse';
import Dashboard from './pages/dashboard/Dashboard';
import Match from './pages/dashboard/Matchs';
import Transaction from './pages/dashboard/Transaction';
import Statistiques from './pages/dashboard/Statistiques';

import Setting from './pages/dashboard/Setting';
import Share from './pages/dashboard/Share';

// Auth pages
import Connexion from './pages/Auth/Connexion';
import Inscription from './pages/Auth/Inscriptions';

const App: React.FC = () => {
  return (
    <Routes>
      {/* Auth routes with auth layout */}
      <Route element={<LayoutAuth />}>
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
      </Route>
      
      {/* Dashboard routes without DashboardLayout */}
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/dashboard/abonnement" element={<Abonnement />} />
<Route path="/dashboard/match-analyse" element={<Analyse />} />
<Route path="/dashboard/coupon-du-jour" element={<Match />} />
<Route path="/dashboard/transactions" element={<Transaction />} />
<Route path="/dashboard/parametres" element={<Setting />} />
<Route path="/dashboard/statistiques" element={<Statistiques />} />
<Route path="/dashboard/share" element={<Share />} />

      {/* Main routes with common layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPages />} />
        <Route path="/pricing" element={<PricingPages />} />
        <Route path="/cgu" element={<CGU />} />
        <Route path="/faq" element={<FAQ />} />

        <Route path="/docs" element={<DocPages />} />
      </Route>
      
      {/* 404 route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;