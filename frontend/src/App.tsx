import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import Layout from './layouts/Layout';
import DashboardLayout from './layouts/DashboardLayout';
import LayoutAuth from './layouts/LayoutAuth';

// Main pages
import HomePage from './pages/HomePages';
import PredictionsPage from './pages/PredictionsPage';
import HowItWorksPage from './pages/HowItWorksPage';
import ContactPage from './pages/ContactPage';
import AboutPages from './pages/AboutPages';
import PricingPages from './pages/PricingPages';
import DocPages from './pages/DocPages';
import NotFoundPage from './pages/NotFoundPage';

// Dashboard pages
import Abonnement from './pages/dashboard/Abonnement';
import Analyse from './pages/dashboard/Analyse';
import Dashboard from './pages/dashboard/Dashboard';
import Match from './pages/dashboard/Matchs';
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
      
      {/* Dashboard routes with dashboard layout */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="abonnement" element={<Abonnement />} />
        <Route path="analyse" element={<Analyse />} />
        <Route path="matchs" element={<Match />} />
        <Route path="setting" element={<Setting />} />
        <Route path="share" element={<Share />} />
      </Route>
      
      {/* Main routes with common layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/predictions" element={<PredictionsPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPages />} />
        <Route path="/pricing" element={<PricingPages />} />
        <Route path="/docs" element={<DocPages />} />
      </Route>
      
      {/* 404 route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;