
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-orange-600 pt-24 pb-12 border-t border-orange-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_2fr] gap-16 mb-20">
          {/* Logo a popis */}
          <div className="text-left">
                <Link to="/" className="flex items-center space-x-3 mb-8 cursor-pointer group">
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <img 
                      src="/images/logo_targos.png" 
                      alt="TARGOŠ logo" 
                      className="w-28 h-28 object-contain"
                    />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-2xl font-black tracking-tighter leading-none text-zinc-900  group-hover:text-white transition-colors">
                      TARGOŠ
                    </span>
                    <span className="text-[10px] font-bold text-zinc-900  tracking-[0.2em] uppercase">Stavebné práce</span>
                  </div>
                </Link>
            <div className="text-zinc-900 text-xs font-bold leading-relaxed mb-2">
              Sme stavebná firma s dlhoročnými skúsenosťami, ktorá realizuje kompletné stavby, rekonštrukcie a modernizácie domov, bytov aj komerčných priestorov po celom Slovensku.
            </div>
            <a href="tel:+421908949117" className="text-zinc-900 text-lg font-black leading-relaxed mb-2 hover:underline">
              +421&nbsp;&nbsp;908&nbsp;&nbsp;949&nbsp;&nbsp;117
            </a>
          </div>
          
          <div className="text-left">
            <h4 className="text-zinc-900 font-black text-xs uppercase tracking-[0.2em] mb-8">Navigácia</h4>
            <ul className="space-y-4 text-sm text-zinc-900">
              <li><Link to="/o-nas" className="text-zinc-900 hover:text-white transition-colors uppercase tracking-widest text-[11px] font-bold" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>O nás</Link></li>
              <li><Link to="/sluzby" className="text-zinc-900 hover:text-white transition-colors uppercase tracking-widest text-[11px] font-bold" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>Služby</Link></li>
              <li><Link to="/realizacie" className="text-zinc-900 hover:text-white transition-colors uppercase tracking-widest text-[11px] font-bold" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>Realizácie</Link></li>
              <li><Link to="/kontakt" className="text-zinc-900 hover:text-white transition-colors uppercase tracking-widest text-[11px] font-bold" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>Kontakt</Link></li>
            </ul>
          </div>
          
          <div className="text-left">
            <h4 className="text-zinc-900 font-black text-xs uppercase tracking-[0.2em] mb-8">Interné</h4>
            <ul className="space-y-4 text-sm text-zinc-900">
              <li><Link to="/admin" className="text-zinc-900 hover:text-white transition-colors uppercase tracking-widest text-[9px] font-black">Správa obsahu</Link></li>
            </ul>
          </div>

          {/* AI Poradca Box ako štvrtý stĺpec */}
          <div className="flex flex-col justify-center items-start">
            <div className="bg-white/10 border border-orange-200 rounded-lg p-8 flex flex-col items-start gap-4 shadow-lg w-full">
              <h3 className="text-zinc-900 text-xl md:text-2xl font-black mb-2 tracking-tight">Potrebujete rýchlu radu k projektu?</h3>
              <p className="text-zinc-900/80 text-sm md:text-base font-medium">Vyskúšajte nášho AI stavebného poradcu a získajte technické odporúčania na mieru.</p>
              <Link to="/ai" className="bg-zinc-900 hover:bg-bg-zinc-900 text-white font-black px-8 py-3 rounded shadow-lg text-sm md:text-base transition-all duration-200 uppercase tracking-widest">
                AI Poradca
              </Link>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-orange-700 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-zinc-900 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} TARGOŠ s.r.o.</p>
          <div className="flex space-x-8">
            <Link to="/gdpr" className="text-zinc-900 hover:text-white transition-colors" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>GDPR</Link>
            <Link to="/cookies" className="text-zinc-900 hover:text-white transition-colors" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
