
import React from 'react';

const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: "Ing. Peter Malý",
      role: "Novostavba RD",
      text: "Firma Targoš nám stavala dom na kľúč. Oceňujem najmä dodržanie rozpočtu, čo je v dnešnej dobe vzácnosť. Komunikácia bola na dennej báze.",
      rating: 5
    },
    {
      name: "Mária Schmidtová",
      role: "Rekonštrukcia bytu",
      text: "Potrebovali sme komplet prerobiť jadro a elektrinu v starom byte. Chlapi prišli, zakryli spoločné priestory a za 3 týždne bolo hotovo. Čisto a profesionálne.",
      rating: 5
    },
    {
      name: "Marek Vizváry",
      role: "Administratívne priestory",
      text: "Realizácia kancelárií prebehla v rekordnom čase. Technické riešenia akustiky, ktoré navrhli, fungujú skvele. Odporúčam pre každú firmu.",
      rating: 5
    }
  ];

  return (
    <section className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-orange-500 font-black uppercase tracking-[0.3em] text-xs mb-4">Referencie</h2>
          <h3 className="text-5xl font-black text-white tracking-tighter uppercase">ČO HOVORIA KLIENTI</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="bg-zinc-900/50 p-10 border border-zinc-800 rounded-sm relative">
              <div className="text-orange-500 mb-6 flex">
                {[...Array(r.rating)].map((_, j) => (
                  <svg key={j} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                ))}
              </div>
              <p className="text-zinc-400 font-light leading-relaxed mb-8 italic">"{r.text}"</p>
              <div>
                <p className="text-white font-black text-sm uppercase tracking-widest">{r.name}</p>
                <p className="text-orange-500 text-[10px] font-bold uppercase mt-1">{r.role}</p>
              </div>
              <svg className="absolute top-10 right-10 w-12 h-12 text-zinc-800 opacity-20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 8.89543 14.017 10V13H11.017V10C11.017 7.23858 13.2556 5 16.017 5H19.017C20.6739 5 22.017 6.34315 22.017 8V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM3.017 21L3.017 18C3.017 16.8954 3.91243 16 5.017 16H8.017C8.56928 16 9.017 15.5523 9.017 15V9C9.017 8.44772 8.56928 8 8.017 8H5.017C3.91243 8 3.017 8.89543 3.017 10V13H0.017V10C0.017 7.23858 2.25558 5 5.017 5H8.017C9.67386 5 11.017 6.34315 11.017 8V15C11.017 18.3137 8.33071 21 5.017 21H3.017Z" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
