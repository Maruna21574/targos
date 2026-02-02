import { Helmet } from 'react-helmet-async';

import React from 'react';
import { useNavigate } from 'react-router-dom';

const serviceCategories = [
    {
      title: "Stavebné práce",
      image: "/images/stavebne_prace.jpg",
      desc: "Základ pre váš domov postavený na pevných základoch.",
      longDesc: "Realizujeme široké spektrum stavebných prác od základov až po strechu. Špecializujeme sa na novostavby rodinných domov, prístavby a nadstavby. Naše skúsenosti zaručujú statickú stabilitu a technologickú precíznosť každého metra štvorcového.",
      items: [
        "Hrubé stavebné práce a zakladanie stavieb",
        "Murárske práce (Ytong, Porotherm, tehla)",
        "Strojové omietky a potery",
        "Zatepľovanie fasád a certifikované systémy",
        "Betónovanie skeletov a monolitov",
        "Búracie práce a odvoz sutiny"
      ]
    },
    {
      title: "Interiér & Dokončovanie",
      image: "/images/interier_a_dokoncovanie.jpg",
      desc: "Estetika a detail, ktorý tvorí atmosféru bývania.",
      longDesc: "Interiér je to, čo robí dom domovom. Zameriavame sa na detailné remeselné spracovanie. Či už ide o luxusné obklady alebo zložité sadrokartónové stropy, náš tím doručí výsledok, ktorý predčí vaše očakávania.",
      items: [
        "Sadrokartónové systémy na mieru (stropy, priečky)",
        "Obklady a veľkoformátové dlažby",
        "Pokládka vinylových a laminátových podláh",
        "Stierkovanie a prémiové maliarske práce",
        "Montáž dverí a zárubní",
        "Kompletné rekonštrukcie kúpeľní na kľúč"
      ]
    },
    {
      title: "Technické Inštalácie",
      image: "/images/technicke_instalacie.jpg",
      desc: "Inteligentné rozvody a bezpečnosť pod omietkou.",
      longDesc: "Kvalitná elektroinštalácia a vodoinštalácia je srdcom každej stavby. Naši certifikovaní technici zabezpečia bezpečnosť, efektivitu a pripravenosť na moderné inteligentné technológie.",
      items: [
        "Kompletná elektroinštalácia (rozvody, revízie)",
        "Rozvody vody, odpadu a kanalizácie",
        "Podlahové kúrenie a tepelné čerpadlá",
        "Montáž a zapojenie sanity",
        "Bleskozvody a inteligentné ovládanie domácnosti"
      ]
    }
  ];

interface ServicesProps {
  isHome?: boolean;
}

const Services: React.FC<ServicesProps> = ({ isHome }) => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Služby | TARGOŠ</title>
        <meta name="description" content="Kompletné stavebné služby, rekonštrukcie, novostavby, elektroinštalácie a ďalšie. Férový prístup, odborný tím." />
        <meta property="og:title" content="Služby | TARGOŠ" />
        <meta property="og:description" content="Kompletné stavebné služby, rekonštrukcie, novostavby, elektroinštalácie a ďalšie. Férový prístup, odborný tím." />
        <meta property="og:image" content="/images/og_services.jpg" />
        <meta property="og:url" content="https://targos.sk/sluzby" />
        <link rel="canonical" href="https://targos.sk/sluzby" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <section
        id="services"
        className={`${isHome ? 'pt-24 md:pt-48 py-16 md:py-32' : 'pt-48 py-32'} bg-white dark:bg-black border-y border-gray-200 dark:border-zinc-900 relative`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-orange-500 font-black uppercase tracking-[0.3em] text-xs mb-4">
              Čo ponúkame
            </h2>
            <h3 className="text-5xl md:text-6xl font-black dark:text-white text-gray-900 tracking-tighter mb-6">KOMPLETNÉ SLUŽBY</h3>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto font-light text-lg">
              Sme vaším jediným partnerom od výkopu až po kolaudáciu. Ponúkame realizácie na kľúč pre súkromný aj firemný sektor.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {serviceCategories.map((cat, idx) => {
              const slug = cat.title
                .toString()
                .normalize('NFD')
                .replace(/\p{Diacritic}/gu, '')
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '')
                .replace(/-+/g, '-');
              return (
                <div
                  key={idx}
                  className="relative group cursor-pointer"
                  tabIndex={0}
                  role="button"
                  onClick={() => navigate(`/sluzby/${slug}`)}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(`/sluzby/${slug}`); }}
                >
                  <div className="absolute inset-0 bg-orange-600 opacity-0 group-hover:opacity-5 blur-3xl transition-opacity duration-500"></div>
                  <div className="relative z-10 bg-white/95 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-700 rounded-2xl h-full flex flex-col hover:border-orange-400 hover:shadow-lg hover:shadow-orange-200/40 dark:hover:shadow-orange-500/20 transition-all duration-300 overflow-hidden shadow-lg shadow-zinc-300/20 dark:shadow-zinc-900/60">
                    {/* Category Image */}
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={cat.image} loading="lazy"
                        alt={cat.title} 
                        className="w-full h-full object-cover grayscale-[30%] opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 dark:from-zinc-900 via-transparent to-transparent"></div>
                    </div>
                    <div className="p-10 flex flex-col flex-grow">
                      <div className="mb-8">
                        <span className="text-orange-500 text-4xl font-black opacity-20">0{idx + 1}</span>
                        <h4 className="text-2xl font-black dark:text-white text-gray-900 mt-2 tracking-tight drop-shadow-lg">{cat.title}</h4>
                        <p className="text-gray-700 dark:text-zinc-500 text-sm mt-4 font-light leading-relaxed">{cat.desc}</p>
                      </div>
                      <ul className="space-y-4 flex-grow">
                        {cat.items.slice(0, 3).map((item, i) => (
                          <li key={i} className="flex items-start space-x-3 text-xs text-gray-600 dark:text-zinc-400">
                            <span className="w-3 h-[1px] bg-orange-600 mt-2 flex-shrink-0"></span>
                            <span className="group-hover:text-gray-900 dark:group-hover:text-zinc-200 transition-colors">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-10 pt-6 border-t border-zinc-800 flex justify-between items-center w-full group/btn">
                        <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 group-hover/btn:underline">Viac detailov</span>
                        <svg className="w-4 h-4 text-orange-500 transform transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
