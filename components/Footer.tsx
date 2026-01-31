
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 pt-24 pb-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2 text-left">
            <Link to="/" className="flex items-center space-x-3 mb-8 cursor-pointer group">
              <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center border border-orange-500/50 group-hover:rotate-12 transition-transform">
                <span className="text-white font-black text-lg">T</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter text-white">TARGOŠ</span>
                <span className="text-[10px] font-bold text-orange-500 tracking-widest uppercase">Kompletné stavebné práce</span>
              </div>
            </Link>
            <div className="text-gray-400 text-xs font-bold leading-relaxed mb-2">
              Voda • Elektrika • Odpad
            </div>
            <div className="text-gray-400 text-xs font-bold leading-relaxed mb-2">
              Domy | Byty | Interiéry
            </div>
            <div className="text-gray-400 text-xs font-bold leading-relaxed mb-2">
              Martin | Pôsobíme po celom Slovensku
            </div>
            <a href="tel:+421908949117" className="text-orange-500 text-lg font-black leading-relaxed mb-2 hover:underline">
              +421&nbsp;&nbsp;908&nbsp;&nbsp;949&nbsp;&nbsp;117
            </a>
          </div>
          
          <div className="text-left">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Navigácia</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/o-nas" className="hover:text-orange-500 transition-colors uppercase tracking-widest text-[11px] font-bold">O nás</Link></li>
              <li><Link to="/sluzby" className="hover:text-orange-500 transition-colors uppercase tracking-widest text-[11px] font-bold">Služby</Link></li>
              <li><Link to="/realizacie" className="hover:text-orange-500 transition-colors uppercase tracking-widest text-[11px] font-bold">Realizácie</Link></li>
              <li><Link to="/kontakt" className="hover:text-orange-500 transition-colors uppercase tracking-widest text-[11px] font-bold">Kontakt</Link></li>
            </ul>
          </div>
          
          <div className="text-left">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Interné</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/admin" className="text-zinc-800 hover:text-orange-600 transition-colors uppercase tracking-widest text-[9px] font-black">Správa obsahu</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-gray-700 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} TARGOŠ s.r.o.</p>
          <div className="flex space-x-8">
            <Link to="/gdpr" className="hover:text-orange-500 transition-colors">GDPR</Link>
            <Link to="/cookies" className="hover:text-orange-500 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
