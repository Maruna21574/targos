
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

interface FAQProps {
  isHome?: boolean;
}

const faqs = [
  {
    q: "Ako dlho trvá vypracovanie cenovej ponuky?",
    a: "Po obhliadke alebo zaslaní projektu spracujeme podrobný rozpočet zvyčajne do 3 až 5 pracovných dní."
  },
  {
    q: "Zabezpečujete aj odvoz stavebného odpadu?",
    a: "Áno, v rámci našich služieb zabezpečujeme pristavenie kontajnerov a následný legálny odvoz a likvidáciu odpadu s potvrdením."
  },
  {
    q: "Poskytujete záruku na vykonané práce?",
    a: "Na všetky naše stavebné a inštalačné práce poskytujeme zákonnú záruku, pričom pri niektorých technológiách (napr. hydroizolácie) je to až 10 rokov."
  },
  {
    q: "Pomáhate aj so stavebným povolením?",
    a: "Vieme vám odporučiť našich overených projektantov a inžinierov, ktorí za vás vybavia kompletný proces ohlásenia stavby alebo stavebného povolenia."
  }
];

const FAQ: React.FC<FAQProps> = ({ isHome }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <>
      <Helmet>
        <title>FAQ | TARGOŠ</title>
        <meta name="description" content="Najčastejšie otázky a odpovede o stavebných prácach, cenách a službách TARGOŠ." />
        <meta property="og:title" content="FAQ | TARGOŠ" />
        <meta property="og:description" content="Najčastejšie otázky a odpovede o stavebných prácach, cenách a službách TARGOŠ." />
        <meta property="og:image" content="/images/og_faq.jpg" />
        <meta property="og:url" content="https://targos.sk/faq" />
        <link rel="canonical" href="https://targos.sk/faq" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <section className={`${isHome ? 'py-16' : 'py-32'} bg-white dark:bg-black`}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-orange-500 font-black uppercase tracking-[0.3em] text-xs mb-4">Otázky</h2>
            <h3 className="text-5xl font-black dark:text-white text-gray-900 tracking-tighter uppercase">ČASTÉ OTÁZKY</h3>
          </div>

          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="border border-gray-300 dark:border-zinc-900 bg-gray-100/80 dark:bg-zinc-900/30 rounded-xl overflow-hidden shadow-md">
                <button 
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full p-6 text-left flex justify-between items-center group"
                >
                  <span className={`text-sm font-black uppercase tracking-widest transition-colors ${openIndex === i ? 'text-orange-500' : 'text-gray-700 dark:text-zinc-400 group-hover:text-gray-900 dark:group-hover:text-white'}`}>
                    {f.q}
                  </span>
                  <span className={`text-2xl transition-transform duration-300 ${openIndex === i ? 'rotate-45 text-orange-500' : 'text-gray-400 dark:text-zinc-700'}`}>+</span>
                </button>
                <div className={`transition-all duration-500 ease-in-out ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-6 pt-0 text-gray-700 dark:text-white text-sm font-light leading-relaxed border-gray-200 dark:border-zinc-800">
                    {f.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
