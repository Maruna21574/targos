
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Portfolio from './components/Portfolio';
import ProjectConsultant from './components/ProjectConsultant';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Legal from './components/Legal';
import Admin from './components/Admin';
import TrustLogos from './components/TrustLogos';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import { getProjects } from './services/supabaseService';

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

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('home');
  const [projects, setProjects] = useState<any[]>(DEFAULT_PROJECTS);
  const [scrolled, setScrolled] = useState(false);
  const [prefilledMessage, setPrefilledMessage] = useState('');
  const [dbLoading, setDbLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const dbProjects = await getProjects();
      if (dbProjects && dbProjects.length > 0) {
        // Mapovanie desc_text späť na desc pre zvyšok aplikácie
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

  const renderContent = () => {
    switch(activePage) {
      case 'home':
        return (
          <div className="animate-in fade-in duration-700">
            <Hero setActivePage={setActivePage} />
            <TrustLogos />
            <About />
            <Services />
            <Portfolio projects={projects} setActivePage={setActivePage} />
            <Testimonials />
            <ProjectConsultant setActivePage={setActivePage} setPrefilledMessage={setPrefilledMessage} />
            <FAQ />
            <Contact prefilledMessage={prefilledMessage} />
          </div>
        );
      case 'about':
        return <About />;
      case 'ai':
        return <ProjectConsultant setActivePage={setActivePage} setPrefilledMessage={setPrefilledMessage} />;
      case 'admin':
        return <Admin projects={projects} setProjects={updateProjectsInState} defaultProjects={DEFAULT_PROJECTS} />;
      case 'services':
        return <Services />;
      case 'portfolio':
        return <div className="pt-20"><Portfolio projects={projects} setActivePage={setActivePage} /><Contact prefilledMessage={prefilledMessage} /></div>;
      case 'contact':
        return <div className="pt-20"><Contact prefilledMessage={prefilledMessage} /></div>;
      case 'gdpr':
      case 'cookies':
        return <div className="pt-20"><Legal type={activePage as 'gdpr' | 'cookies'} /></div>;
      default:
        return <div className="pt-20 text-center text-white">Sekcia sa pripravuje...</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <Navbar scrolled={scrolled} activePage={activePage} setActivePage={setActivePage} />
      {dbLoading && activePage === 'home' && (
        <div className="fixed bottom-4 right-4 bg-orange-600 text-white p-2 rounded-full animate-pulse z-50">
           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        </div>
      )}
      <main className="flex-grow">{renderContent()}</main>
      <Footer setActivePage={setActivePage} />
    </div>
  );
};

export default App;
