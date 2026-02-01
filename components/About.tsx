
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 mt-32 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-2xl border border-zinc-800 transform rotate-2">
              <img 
                src="/images/targos_praca_hp.jpg"
                alt="Práca TARGOŠ" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            {/* The Badge */}
            <div className="absolute -bottom-10 -left-10 bg-orange-600 p-10 rounded-sm shadow-2xl border border-orange-500 -rotate-3 hidden md:block">
              <p className="text-7xl font-black text-white leading-none">30</p>
              <p className="text-white/90 font-black uppercase tracking-[0.2em] text-[10px] mt-2">Rokov expertízy</p>
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-orange-500 font-black uppercase tracking-[0.3em] text-xs mb-4">O Našej Firme</h2>
              <h3 className="text-5xl md:text-6xl font-black text-white leading-none tracking-tighter">
                SILA TRADÍCIE, <br /> KVALITA BUDÚCNOSTI.
              </h3>
            </div>
            
            <p className="text-gray-400 text-lg leading-relaxed font-light">
              Na stavebnom trhu pôsobíme od roku 1994. Ako <span className="text-white font-bold">TARGOŠ</span> sme vybudovali tisícky metrov štvorcových v rodinných domoch, bytoch aj komerčných priestoroch. Naša práca nie je len o tehle a betóne, ale o dôvere, ktorú do nás vkladáte už tri dekády.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="p-6 bg-zinc-900/50 border-l-4 border-orange-600">
                <h4 className="text-white font-black text-lg mb-2">Práca na kľúč</h4>
                <p className="text-gray-500 text-sm">Od výkopových prác až po posledný ťah štetcom. Postaráme sa o všetko.</p>
              </div>
              <div className="p-6 bg-zinc-900/50 border-l-4 border-zinc-700">
                <h4 className="text-white font-black text-lg mb-2">Férová cena</h4>
                <p className="text-gray-500 text-sm">Transparentný rozpočet bez skrytých poplatkov a nečakaných navýšení.</p>
              </div>
            </div>

            <div className="pt-6">
               <div className="flex items-center space-x-6 text-zinc-600">
                  <span className="text-sm font-bold uppercase tracking-widest">Technológie</span>
                  <div className="h-[1px] flex-grow bg-zinc-800"></div>
                  <span className="text-sm font-bold uppercase tracking-widest">Inovácie</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
