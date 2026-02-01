import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Statické služby - rovnaké ako v Services.tsx
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

function slugify(text: string) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

const ServiceDetail: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = serviceCategories.find(s => slugify(s.title) === slug);

  if (!service) return <div className="pt-20 text-center text-white">Služba nebola nájdená.</div>;

  // Fallback text for podstránka
  const podstrankaText = 'Táto podstránka obsahuje detailné informácie o službe. Získajte viac informácií o tom, čo všetko zahŕňa, aké sú výhody a prečo si vybrať práve túto službu.';

  return (
    <section className="py-32 pt-16 md:pt-32 bg-black min-h-screen">
      <div className="max-w-4xl pt-32 mx-auto px-4">
        {/* Horné tlačidlo späť */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 border border-orange-600 text-orange-500 font-black uppercase tracking-widest shadow-lg hover:bg-orange-600 hover:text-white hover:shadow-orange-500/30 transition-all text-xs group"
        >
          <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Späť na služby
        </button>
        <h1 className="text-4xl font-black text-white mb-4">{service.title}</h1>
        {service.image && (
          <img src={service.image} alt={service.title} className="w-full rounded mb-8" />
        )}
        <p className="text-lg text-zinc-300 mb-8">{service.desc}</p>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-sm p-6 mb-8">
          <h2 className="text-white font-black text-lg mb-2">O službe</h2>
          <p className="text-zinc-400 text-base">{podstrankaText}</p>
        </div>
        {service.longDesc && (
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-sm p-6 mb-8">
            <h2 className="text-white font-black text-lg mb-2">Detailný popis</h2>
            <p className="text-zinc-400 text-base">{service.longDesc}</p>
          </div>
        )}
        {service.items && Array.isArray(service.items) && service.items.length > 0 && (
          <div className="mb-8">
            <h3 className="text-orange-500 font-black uppercase text-xs mb-4 tracking-widest">Čo zahŕňa služba</h3>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300">
              {service.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {/* Pridajte ďalšie polia podľa potreby */}
        {/* Dolné tlačidlo späť */}
        <div className="flex justify-center mt-16">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-8 py-4 rounded-full bg-zinc-900 border border-orange-600 text-orange-500 font-black uppercase tracking-widest shadow-lg hover:bg-orange-600 hover:text-white hover:shadow-orange-500/30 transition-all text-sm group"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Späť na služby
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetail;
