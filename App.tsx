
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

const DEFAULT_PROJECTS = [
  { 
    id: 1,
    title: "Moderná Vila pod Lesom", 
    loc: "Bratislava - Koliba", 
    img: "https://images.unsplash.com/photo-1600585154340-be6199f74039?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1600566753190-17f0bbc2249b?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600607687940-4e2a09695d51?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600585154542-6379b1747808?auto=format&fit=crop&q=80&w=1200"
    ],
    desc: "Kompletná realizácia monolitického skeletu rodinnej vily v náročnom svahovitom teréne. Projekt zahŕňal komplexné riešenie od zemných prác až po finálne stierky a inteligentnú elektroinštaláciu.",
    cost: "245 000 €",
    duration: "14 mesiacov",
    year: "2023",
    scope: "Zemné práce, Monolitický betón, Murovanie, Zateplenie, Fasáda, Elektroinštalácia",
    process: "1. Výkopové práce | Kompletná vykopávka základových pásov v skalnatom podloží pomocou 8-tonového bágra a následný odvoz zeminy.; 2. Hrubá stavba | Použitý materiál Porotherm 30 Profi na lepidlo, zaliatie monolitických stropov s prísadou proti mrazu a montáž krovu.; 3. Elektroinštalácia | Kompletné rozvody kabeláže pre inteligentnú domácnosť Loxone, osadenie rozvádzača a revízna správa.; 4. Fasáda | Zateplenie minerálnou vlnou hrúbky 20cm a finálna silikónová omietka v modernom antracitovom odtieni."
  },
  { 
    id: 2,
    title: "Rekonštrukcia Mezonetu", 
    loc: "Trnava - Centrum", 
    img: "https://images.unsplash.com/photo-1600607687940-4e2a09695d51?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200"
    ],
    desc: "Celková obnova staršieho podkrovného priestoru. Cieľom bolo vytvoriť moderný otvorený priestor pri zachovaní pôvodných trámov a historického rázu budovy.",
    cost: "62 000 €",
    duration: "4 mesiace",
    year: "2024",
    scope: "Búracie práce, Sadrokartóny, Podlahy, Sanita, Maľovanie",
    process: "1. Príprava a búranie | Odstránenie starých priečok, starých podláh a pôvodnej sanity. Zabezpečenie nosných konštrukcií.; 2. Inštalácie | Výmena všetkých rozvodov vody a elektriny. Osadenie nových geberitov a príprava pre klimatizáciu.; 3. Sadrokartóny | Montáž protipožiarneho sadrokartónu v celom podkroví, zateplenie striekanou izoláciou a tmelenie v kvalite Q3.; 4. Finálne úpravy | Pokládka dubových parkiet, montáž bezfalcových dverí a prémiové maľovanie umývateľnou farbou."
  },
  { 
    id: 3,
    title: "Priemyselný Loft v Sklade", 
    loc: "Bratislava - Ružinov", 
    img: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=1200"
    ],
    desc: "Konverzia bývalého priemyselného skladu na luxusný obytný priestor. Dôraz na odhalený betón a masívne oceľové prvky.",
    cost: "89 000 €",
    duration: "6 mesiacov",
    year: "2023",
    scope: "Sanácia betónu, Oceľové konštrukcie, Podlahové kúrenie, Presklené steny",
    process: "1. Sanácia podkladu | Otrieskanie starých náterov z betónových stĺpov a odborná sanácia výstuže s certifikátom.; 2. Kúrenie | Inštalácia podlahového kúrenia Rehau s následným zaliatím lešteného betónového poteru.; 3. Oceľové prvky | Výroba a montáž interiérového schodiska a mezanínu z čiernej surovej ocele s bezfarebným lakom.; 4. Presklenie | Osadenie veľkoformátových hliníkových presklení v antracitovom prevedení s trojsklom."
  },
  { 
    id: 4,
    title: "Bungalov s Plochou Strechou", 
    loc: "Senec - Slnečné Jazerá", 
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&q=80&w=1200"
    ],
    desc: "Moderný rodinný dom s minimalistickou architektúrou. Realizácia od základovej dosky po hydroizoláciu strechy a fasádu.",
    cost: "198 000 €",
    duration: "10 mesiacov",
    year: "2022",
    scope: "Základy, Murovanie, Plochá strecha, Zateplenie",
    process: "1. Zakladanie | Betonáž základovej dosky s integrovaným rozvodom vody a kanalizácie. Tepelná izolácia základov XPS.; 2. Murovanie | Presné murovanie z tvárnic Heluz na tenkovrstvovú maltu. Osadenie prekladov pre externé žalúzie.; 3. Strešný systém | Realizácia spádovej vrstvy z polystyrénu, montáž PVC fólie Fatrafol a štrkový zásyp.; 4. Fasáda | Aplikácia fasádneho systému s kombináciou bielej omietky a tehlového obkladu Elastolith."
  },
  { 
    id: 5,
    title: "Centrála IT Spoločnosti", 
    loc: "Žilina - Vlčince", 
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200"
    ],
    desc: "Kompletné technické vybavenie a interiérová úprava administratívnych priestorov s plochou 450 m2.",
    cost: "115 000 €",
    duration: "5 mesiacov",
    year: "2024",
    scope: "Elektroinštalácie, Dátové siete, Klimatizácia, Akustické podhľady",
    process: "1. Kabeláž | Ťahanie viac ako 12km dátových káblov Cat6a a silnoprúdových rozvodov v zdvojených podlahách.; 2. Akustika | Montáž kazetových podhľadov Ecophon pre zabezpečenie ideálneho útlmu hluku v open-space priestore.; 3. Klimatizácia | Inštalácia VRV systému Daikin s individuálním ovládáním pro každú zasadačku.; 4. Finálne prvky | Osadenie sklenených priečok s akustickou izoláciou a montáž dizajnových lineárnych svietidiel."
  },
  { 
    id: 6,
    title: "Fasáda Historického Domu", 
    loc: "Banská Štiavnica", 
    img: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1590725121839-892b458a74fe?auto=format&fit=crop&q=80&w=1200"
    ],
    desc: "Citlivá rekonštrukcia uličnej fasády meštianskeho domu v pamiatkovej rezervácii. Obnova štukových prvkov.",
    cost: "34 000 €",
    duration: "3 mesiace",
    year: "2023",
    scope: "Reštaurovanie omietok, Sanácia vlhkosti, Maľovanie vápennými farbami",
    process: "1. Diagnostika | Odstránenie nevhodných cementových omietok a odsoľovanie muriva pomocou špeciálnych obkladov.; 2. Jadrové omietky | Aplikácia sanačných vápenných omietok Baumit Sanova s vysokou paropriepustnosťou.; 3. Štuková výzdoba | Ručné modelovanie chýbajúcich častí ríms a šambrán podľa pôvodných šablón.; 4. Finálna úprava | Náter silikátovou farbou Keim v odtieni schválenom pamiatkovým úradom."
  }
];

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const [projects, setProjects] = useState<any[]>([]);
  const [prefilledMessage, setPrefilledMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('targos_projects');
    if (saved) {
      setProjects(JSON.parse(saved));
    } else {
      setProjects(DEFAULT_PROJECTS);
      localStorage.setItem('targos_projects', JSON.stringify(DEFAULT_PROJECTS));
    }

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const updateProjects = (newProjects: any[]) => {
    setProjects(newProjects);
    localStorage.setItem('targos_projects', JSON.stringify(newProjects));
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
        return (
          <div className="animate-in fade-in duration-700 text-left">
            {renderHome()}
          </div>
        );
      case 'admin':
        return <Admin projects={projects} setProjects={updateProjects} />;
      case 'about':
        return <div className="pt-20"><About /><Contact prefilledMessage={prefilledMessage} setPrefilledMessage={setPrefilledMessage} /></div>;
      case 'services':
        return <div className="pt-20"><Services /><Contact prefilledMessage={prefilledMessage} setPrefilledMessage={setPrefilledMessage} /></div>;
      case 'portfolio':
        return <div className="pt-20"><Portfolio projects={projects} setActivePage={setActivePage} /><Contact prefilledMessage={prefilledMessage} setPrefilledMessage={setPrefilledMessage} /></div>;
      case 'ai':
        return <div className="pt-20 min-h-screen bg-zinc-950"><ProjectConsultant setActivePage={setActivePage} setPrefilledMessage={setPrefilledMessage} /><Contact prefilledMessage={prefilledMessage} setPrefilledMessage={setPrefilledMessage} /></div>;
      case 'contact':
        return <div className="pt-20"><Contact prefilledMessage={prefilledMessage} setPrefilledMessage={setPrefilledMessage} /></div>;
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
