
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface LegalProps {
  type: 'gdpr' | 'cookies';
}

const Legal: React.FC<LegalProps> = ({ type }) => {
  return (
    <>
      <Helmet>
        <title>Právne informácie | TARGOŠ</title>
        <meta name="description" content="Právne informácie, GDPR a ochrana osobných údajov. TARGOŠ - stavebné práce s tradíciou." />
        <meta property="og:title" content="Právne informácie | TARGOŠ" />
        <meta property="og:description" content="Právne informácie, GDPR a ochrana osobných údajov. TARGOŠ - stavebné práce s tradíciou." />
        <meta property="og:image" content="/images/og_legal.jpg" />
        <meta property="og:url" content="https://targos.sk/gdpr" />
        <link rel="canonical" href="https://targos.sk/gdpr" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="py-48 bg-zinc-100 dark:bg-black min-h-screen transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-black text-zinc-900 dark:text-white mb-4 tracking-tighter uppercase">
            {type === 'gdpr' ? 'Ochrana osobných údajov' : 'Používanie súborov Cookies'}
          </h1>
          <div className="prose max-w-none text-zinc-700 dark:prose-invert dark:text-zinc-300 leading-relaxed space-y-8 transition-colors">
            <section>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 uppercase tracking-widest text-sm">Úvodné ustanovenia</h2>
              <p>
                Spoločnosť <strong>TARGOŠ STAVEBNÉ PRÁCE s.r.o.</strong>, so sídlom v Bratislave (ďalej len "Prevádzkovateľ"), dbá na ochranu vášho súkromia. Tento dokument vysvetľuje, ako spracovávame vaše údaje v súlade so všeobecným nariadením o ochrane údajov (GDPR).
              </p>
            </section>
            {type === 'gdpr' ? (
              <>
                <section>
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 uppercase tracking-widest text-sm">Rozsah spracovania údajov</h2>
                  <p>
                    Spracovávame iba údaje nevyhnutné na poskytnutie cenovej ponuky alebo realizáciu stavebných prác: meno, priezvisko, e-mail, telefónne číslo a adresu stavby.
                  </p>
                </section>
                <section>
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 uppercase tracking-widest text-sm">Vaše práva</h2>
                  <p>
                    Máte právo na prístup k údajom, ich opravu, vymazanie (právo na "zabudnutie") a právo namietať proti spracovaniu. Kontaktujte nás na info@targos.sk pre akékoľvek požiadavky.
                  </p>
                </section>
              </>
            ) : (
              <>
                <section>
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 uppercase tracking-widest text-sm">Čo sú Cookies?</h2>
                  <p>
                    Súbory cookies sú malé textové súbory, ktoré sa ukladajú vo vašom prehliadači. Pomáhajú nám pochopiť, ktoré časti nášho webu sú pre vás zaujímavé a zabezpečujú správne fungovanie stránky.
                  </p>
                </section>
                <section>
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 uppercase tracking-widest text-sm">Typy cookies</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Nevyhnutné:</strong> Nutné pre chod webu (napr. navigácia).</li>
                    <li><strong>Analytické:</strong> Pomáhajú nám zlepšovať web sledovaním návštevnosti (Google Analytics).</li>
                  </ul>
                </section>
              </>
            )}
            <section className="pt-12 border-t border-zinc-300 dark:border-zinc-900">
              <p className="text-xs italic text-zinc-500 dark:text-zinc-400">Naposledy aktualizované: {new Date().toLocaleDateString('sk-SK')}</p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Legal;
