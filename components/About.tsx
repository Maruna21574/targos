import React from 'react';

interface AboutProps {
  isHome?: boolean;
}

const About: React.FC<AboutProps> = ({ isHome }) => {
  return (
      <section id="about" className={`${isHome ? 'py-16 mt-0' : 'py-56 mt-0'} bg-white dark:bg-zinc-950 relative overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-2xl border border-gray-300 dark:border-zinc-800 transform rotate-2">
              <img 
                src="/images/targos_praca_hp.jpg" loading="lazy"
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
              <h3 className="text-5xl md:text-6xl font-black dark:text-white text-gray-900 leading-none tracking-tighter">
                SILA TRADÍCIE, <br /> KVALITA BUDÚCNOSTI.
              </h3>
            </div>
            
            <p className="text-gray-700 dark:text-gray-400 text-lg leading-relaxed font-light">
              Na stavebnom trhu pôsobíme od roku 1994. Ako <span className="dark:text-white text-gray-900 font-bold">TARGOŠ</span> sme vybudovali tisícky metrov štvorcových v rodinných domoch, bytoch aj komerčných priestoroch. Naša práca nie je len o tehle a betóne, ale o dôvere, ktorú do nás vkladáte už tri dekády.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="p-6 bg-gray-100 dark:bg-zinc-900/50 border-l-4 border-orange-600">
                <h4 className="dark:text-white text-gray-900 font-black text-lg mb-2">Práca na kľúč</h4>
                <p className="text-gray-600 dark:text-gray-500 text-sm">Od výkopových prác až po posledný ťah štetcom. Postaráme sa o všetko.</p>
              </div>
              <div className="p-6 bg-gray-100 dark:bg-zinc-900/50 border-l-4 border-gray-300 dark:border-zinc-700">
                <h4 className="dark:text-white text-gray-900 font-black text-lg mb-2">Férová cena</h4>
                <p className="text-gray-600 dark:text-gray-500 text-sm">Transparentný rozpočet bez skrytých poplatkov a nečakaných navýšení.</p>
              </div>
            </div>

            <div className="pt-6">
              <div className="flex items-center space-x-6 text-gray-400 dark:text-zinc-600">
                <span className="text-sm font-bold uppercase tracking-widest">Technológie</span>
                <div className="h-[1px] flex-grow bg-gray-300 dark:bg-zinc-800"></div>
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
