
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
    <section className="py-16 bg-white dark:bg-black border-b border-gray-200 dark:border-zinc-900 print:hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="rounded-2xl shadow-xl bg-gray-50/80 dark:bg-zinc-900/80 border border-gray-200 dark:border-zinc-800 p-10 md:p-16 flex flex-col items-center">
          <p className="text-center text-gray-700 dark:text-zinc-500 text-xs md:text-sm font-black uppercase tracking-[0.4em] mb-10">Certifikovaní partneri a materiály</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
            {partners.map((p, i) => (
              <div key={i} className="h-8 md:h-12 flex items-center group">
                 <span className="font-black text-xl md:text-2xl tracking-tighter group-hover:text-orange-500 transition-colors dark:text-white text-gray-900">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustLogos;
