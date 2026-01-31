
import React, { useState } from 'react';

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const serviceCategories = [
    {
      title: "Stavebné práce",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=600",
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
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600",
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
      image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=600",
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

  return (
    <section id="services" className="py-32 bg-black border-y border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-orange-500 font-black uppercase tracking-[0.3em] text-xs mb-4">Čo ponúkame</h2>
          <h3 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-6">KOMPLETNÉ SLUŽBY</h3>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto font-light text-lg">
            Sme vaším jediným partnerom od výkopu až po kolaudáciu. Ponúkame realizácie na kľúč pre súkromný aj firemný sektor.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {serviceCategories.map((cat, idx) => (
            <div key={idx} className="relative group">
               <div className="absolute inset-0 bg-orange-600 opacity-0 group-hover:opacity-5 blur-3xl transition-opacity duration-500"></div>
               <div className="relative z-10 bg-zinc-900/40 border border-zinc-800 rounded-sm h-full flex flex-col hover:border-orange-500/30 transition-all duration-500 overflow-hidden">
                  
                  {/* Category Image */}
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={cat.image} 
                      alt={cat.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                  </div>

                  <div className="p-10 flex flex-col flex-grow">
                    <div className="mb-8">
                      <span className="text-orange-500 text-4xl font-black opacity-20">0{idx + 1}</span>
                      <h4 className="text-2xl font-black text-white mt-2 tracking-tight">{cat.title}</h4>
                      <p className="text-zinc-500 text-sm mt-4 font-light leading-relaxed">{cat.desc}</p>
                    </div>
                    <ul className="space-y-4 flex-grow">
                      {cat.items.slice(0, 3).map((item, i) => (
                        <li key={i} className="text-zinc-400 flex items-start space-x-3 text-xs">
                          <span className="w-3 h-[1px] bg-orange-600 mt-2 flex-shrink-0"></span>
                          <span className="group-hover:text-zinc-200 transition-colors">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <button 
                      onClick={() => setSelectedService(idx)}
                      className="mt-10 pt-6 border-t border-zinc-800 flex justify-between items-center w-full group/btn"
                    >
                       <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 group-hover/btn:underline">Viac detailov</span>
                       <svg className="w-4 h-4 text-orange-500 transform transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                       </svg>
                    </button>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-12 rounded-sm max-w-2xl w-full relative max-h-[90vh] overflow-y-auto shadow-2xl">
            <button 
              onClick={() => setSelectedService(null)}
              className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="mb-8 rounded-sm overflow-hidden h-64">
              <img 
                src={serviceCategories[selectedService].image} 
                className="w-full h-full object-cover" 
                alt={serviceCategories[selectedService].title} 
              />
            </div>

            <h4 className="text-3xl font-black text-white mb-4 tracking-tighter uppercase">
              {serviceCategories[selectedService].title}
            </h4>
            <p className="text-orange-500 font-bold mb-8 uppercase tracking-widest text-[10px]">Detailný rozsah prác</p>
            <p className="text-zinc-300 mb-10 leading-relaxed font-light">
              {serviceCategories[selectedService].longDesc}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {serviceCategories[selectedService].items.map((item, i) => (
                <div key={i} className="flex items-center space-x-3 text-zinc-400 text-xs">
                  <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setSelectedService(null)}
              className="w-full bg-orange-600 text-white px-8 py-5 font-black text-xs uppercase tracking-widest hover:bg-orange-700 transition-colors shadow-xl"
            >
              Zavrieť detail
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
