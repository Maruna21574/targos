import { useLocation } from 'react-router-dom';

// Komponenta na scrollovanie hore pri zmene route
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

import React, { useState, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Portfolio from './components/Portfolio';
import ProjectConsultant from './components/ProjectConsultant';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PricingSection from './components/PricingSection';
import PricingPage from './components/PricingPage';
import Legal from './components/Legal';
import Admin from './components/Admin';
import TrustLogos from './components/TrustLogos';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import { getProjects } from './services/supabaseService';
import ProjectDetail from './components/ProjectDetail';
import ScrollToTopButton from './components/ScrollToTopButton';

// Pomocná funkce na slugifikaci názvu
function slugify(text) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}
import ServiceDetail from './components/ServiceDetail';

const DEFAULT_SERVICES = [
  { id: 1, title: 'Kompletná rekonštrukcia', img: '', desc: 'Kompletné stavebné práce na kľúč.' },
  { id: 2, title: 'Novostavba rodinného domu', img: '', desc: 'Výstavba nových rodinných domov.' },
  { id: 3, title: 'Elektroinštalácie & Revízie', img: '', desc: 'Kompletné elektroinštalácie a revízie.' },
  { id: 4, title: 'Iné stavebné práce', img: '', desc: 'Všetky ostatné stavebné práce podľa dohody.' },
];

const App: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [services] = useState<any[]>(DEFAULT_SERVICES);
  const [scrolled, setScrolled] = useState(false);
  const [prefilledMessage, setPrefilledMessage] = useState('');
  const [dbLoading, setDbLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const dbProjects = await getProjects();
      if (dbProjects && dbProjects.length > 0) {
        const mapped = dbProjects.map(p => ({
          ...p,
          desc: p.desc_text
        }));
        setProjects(mapped);
      }
      setDbLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Navbar scrolled={scrolled} />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About isHome />
              <Services isHome />
              <Portfolio isHome />
              <Testimonials isHome />
              <ProjectConsultant isHome />
              <FAQ isHome />
              <Contact isHome />
            </>
          } />
          <Route path="/sluzby" element={<Services />} />
          <Route path="/sluzby/:slug" element={<ServiceDetail />} />
          <Route path="/projekty" element={<Portfolio />} />
          <Route path="/projekty/:slug" element={<ProjectDetail />} />
          <Route path="/cennik" element={<PricingPage />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/gdpr" element={<Legal />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/o-nas" element={<About />} />
          <Route path="/realizacie" element={<Portfolio projects={projects} />} />
          <Route path="/realizacie/:slug" element={<ProjectDetail projects={projects} />} />
          <Route path="/ai" element={<ProjectConsultant setPrefilledMessage={setPrefilledMessage} />} />
          <Route path="/cenova-ponuka" element={<PricingPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <TrustLogos />
        <Footer />
        <ScrollToTopButton />
      </Router>
    </HelmetProvider>
  );
};

export default App;
