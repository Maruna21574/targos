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

const DEFAULT_PROJECTS = [
  {
    "id": 1,
    "title": "Moderná Vila pod Lesom",
    "loc": "Bratislava - Koliba",
    "img": "https://images.unsplash.com/photo-1600585154340-be6199f74039?auto=format&fit=crop&q=80&w=1200",
    "gallery": [
      "https://images.unsplash.com/photo-1600566753190-17f0bbc2249b?auto=format&fit=crop&q=80&w=1200"
    ],
    "desc": "Kompletná realizácia monolitického skeletu rodinnej vily.",
    "cost": "245 000 €",
    "duration": "14 mesiacov",
    "year": "2023",
    "scope": "Hrubá stavba, Fasáda",
    "process": "1. Príprava | Terénne úpravy.; 2. Realizácia | Betonáž."
  }
];



// Mock služby - upravte podľa reálnych dát
const DEFAULT_SERVICES = [
  { id: 1, title: 'Kompletná rekonštrukcia', img: '', desc: 'Kompletné stavebné práce na kľúč.' },
  { id: 2, title: 'Novostavba rodinného domu', img: '', desc: 'Výstavba nových rodinných domov.' },
  { id: 3, title: 'Elektroinštalácie & Revízie', img: '', desc: 'Kompletné elektroinštalácie a revízie.' },
  { id: 4, title: 'Iné stavebné práce', img: '', desc: 'Všetky ostatné stavebné práce podľa dohody.' },
];

const App: React.FC = () => {
  const [projects, setProjects] = useState<any[]>(DEFAULT_PROJECTS);
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
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const updateProjectsInState = (newProjects: any[]) => {
    setProjects(newProjects);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#0A0A0A]">
        <ScrollToTopButton />
        <Navbar scrolled={scrolled} />
        {dbLoading && (
          <div className="fixed bottom-4 right-4 bg-orange-600 text-white p-2 rounded-full animate-pulse z-50">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          </div>
        )}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <div className="animate-in fade-in duration-700">
                <Hero />
                <About isHome />
                <Services isHome />
                <TrustLogos />
                <Portfolio projects={projects} isHome />
                <Testimonials isHome />
                {/* <ProjectConsultant setPrefilledMessage={setPrefilledMessage} /> */}
                <FAQ isHome />
                <PricingSection />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <Contact prefilledMessage={prefilledMessage} isHome />
                </div>
                
              </div>
            } />
            <Route path="/o-nas" element={<About />} />
            <Route path="/ai" element={<ProjectConsultant setPrefilledMessage={setPrefilledMessage} />} />
            <Route path="/admin" element={<Admin projects={projects} setProjects={updateProjectsInState} defaultProjects={DEFAULT_PROJECTS} />} />
            <Route path="/sluzby" element={<Services />} />
            <Route path="/sluzby/:slug" element={<ServiceDetail services={services} />} />
            <Route path="/realizacie" element={<Portfolio projects={projects} />} />
            <Route path="/realizacie/:slug" element={<ProjectDetail projects={projects} />} />
            <Route path="/kontakt" element={<div className="pt-20"><Contact prefilledMessage={prefilledMessage} /><ProjectConsultant setPrefilledMessage={setPrefilledMessage} /></div>} />
            <Route path="/cenova-ponuka" element={<PricingPage />} />
            <Route path="/gdpr" element={<Legal type="gdpr" />} />
            <Route path="/cookies" element={<Legal type="cookies" />} />
            <Route path="*" element={<div className="pt-20 text-center text-white">Sekcia sa pripravuje...</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
