import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import Layout from './layouts/Layout';

import NotFoundPage from './pages/NotFoundPage';
import Home from './pages/Home';
import Projects from './pages/Projects';
import RessourcesPages from './pages/RessourcesPages';
import About from './pages/About';
import Contact from './pages/Contact';
import ProjectSubmissionForm from './pages/Demande';
const App: React.FC = () => {
  return (
    <Routes>
      
      {/* Dashboard routes without DashboardLayout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/nos-projets" element={<Projects />} />
        <Route path="/ressources" element={<RessourcesPages />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/soumettre-projet" element={<ProjectSubmissionForm />} />


      </Route>
      
      {/* 404 route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;