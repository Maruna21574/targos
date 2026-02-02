
import React from 'react';

const TrustLogos: React.FC = () => {
  const partners = [
    { name: 'Baumit', url: 'https://www.baumit.sk/images/logo.svg' },
    { name: 'Ytong', url: 'https://www.ytong.sk/templates/ytong/images/logo.svg' },
    { name: 'Porotherm', url: 'https://www.wienerberger.sk/content/dam/wienerberger/netherlands/marketing/logo/wienerberger-logo.svg' },
    { name: 'Loxone', url: 'https://www.loxone.com/wp-content/themes/loxone/assets/images/logo-dark.svg' },
    { name: 'Rigips', url: 'https://www.rigips.sk/themes/custom/rigips/logo.svg' }
  ];

  return (
    <section className="py-12 bg-zinc-900/30 border-b border-zinc-900 print:hidden">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] mb-10">Certifikovaní partneri a materiály</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
          {partners.map((p, i) => (
            <div key={i} className="h-8 md:h-12 flex items-center group">
               <span className="text-white font-black text-xl md:text-2xl tracking-tighter group-hover:text-orange-500 transition-colors">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustLogos;
