
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

/**
 * TU UPRAVUJTE SVOJE REALIZÁCIE
 * Keď sem pridáte nový projekt a dáte 'git push', 
 * Vercel automaticky aktualizuje váš web na doméne.
 */
const DEFAULT_PROJECTS = [
  { 
    id: 1,
    title: "Moderná Vila pod Lesom", 
    loc: "Bratislava - Koliba", 
    img: "https://images.unsplash.com/photo-1600585154340-be6199f74039?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1600566753190-17f0bbc2249b?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600607687940-4e2a09695d51?auto=format&fit=crop&q=80&w=1200"
    ],
    desc: "Kompletná realizácia monolitického skeletu rodinnej vily v náročnom svahovitom teréne.",
    cost: "245 000 €",
    duration: "14 mesiacov",
    year: "2023",
    scope: "Zemné práce, Monolitický betón, Murovanie, Fasáda",
    process: "1. Výkopové práce | Vykopávka základových pásov v skalnatom podloží.; 2. Hrubá stavba | Murovanie Porotherm 30 Profi a zaliatie stropov.; 3. Elektroinštalácia | Rozvody pre inteligentnú domácnosť.; 4. Fasáda | Zateplenie minerálnou vlnou 20cm."
  },
  { 
    id: 2,
    title: "Rekonštrukcia Mezonetu", 
    loc: "Trnava - Centrum", 
    img: "https://images.unsplash.com/photo-1600607687940-4e2a09695d51?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&q=80&w=1200"
    ],
    desc: "Celková obnova staršieho podkrovného priestoru v historickom centre.",
    cost: "62 000 €",
    duration: "4 mesiace",
    year: "2024",
    scope: "Búracie práce, Sadrokartóny, Sanita, Podlahy",
    process: "1. Príprava | Odstránenie starých priečok a rozvodov.; 2. Inštalácie | Nové rozvody vody a elektriny.; 3. Finiš | Pokládka dubových parkiet a maľovanie."
  }
];

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const [projects, setProjects] = useState<any[]>(DEFAULT_PROJECTS);
  const [prefilledMessage, setPrefilledMessage] = useState('');

  useEffect(() => {
    // Načítanie "rozpísaných" zmien z prehliadača, ak existujú
    const saved = localStorage.getItem('targos_projects_draft');
    if (saved) {
      setProjects(JSON.parse(saved));
    }

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const updateProjects = (newProjects: any[]) => {
    setProjects(newProjects);
    localStorage.setItem('targos_projects_draft', JSON.stringify(newProjects));
  };

  const renderHome = () => (
    <>
      <Hero setActivePage={setActivePage} />
      <TrustLogos />
      <About />
      <Services />
      <Portfolio projects={projects} setActivePage={setActivePage} />
      <Testimonials />
      <ProjectConsultant setActivePage={setActivePage} setPrefilledMessage={setPrefilledMessage} />
      <FAQ />
      <Contact prefilledMessage={prefilledMessage} setPrefilledMessage={setPrefilledMessage} />
    </>
  );

  const renderContent = () => {
    switch(activePage) {
      case 'home':
        return <div className="animate-in fade-in duration-700">{renderHome()}</div>;
      case 'admin':
        return <Admin projects={projects} setProjects={updateProjects} />;
      case 'about':
        return <div className="pt-20"><About /><Contact prefilledMessage={prefilledMessage} /></div>;
      case 'services':
        return <div className="pt-20"><Services /><Contact prefilledMessage={prefilledMessage} /></div>;
      case 'portfolio':
        return <div className="pt-20"><Portfolio projects={projects} setActivePage={setActivePage} /><Contact prefilledMessage={prefilledMessage} /></div>;
      case 'ai':
        return <div className="pt-20 bg-zinc-950 min-h-screen"><ProjectConsultant setActivePage={setActivePage} setPrefilledMessage={setPrefilledMessage} /><Contact prefilledMessage={prefilledMessage} /></div>;
      case 'contact':
        return <div className="pt-20"><Contact prefilledMessage={prefilledMessage} /></div>;
      case 'gdpr':
      case 'cookies':
        return <div className="pt-20"><Legal type={activePage as 'gdpr' | 'cookies'} /></div>;
      default:
        return renderHome();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <Navbar scrolled={scrolled} activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-grow">{renderContent()}</main>
      <Footer setActivePage={setActivePage} />
    </div>
  );
};

export default App;
