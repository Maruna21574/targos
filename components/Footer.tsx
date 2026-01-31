
import React from 'react';

interface FooterProps {
  setActivePage: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setActivePage }) => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleLinkClick = (page: string) => {
    setActivePage(page);
    scrollToTop();
  };

  return (
    <footer className="bg-zinc-950 pt-24 pb-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2 text-left">
            <div 
              className="flex items-center space-x-3 mb-8 cursor-pointer group"
              onClick={() => handleLinkClick('home')}
            >
              <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center border border-orange-500/50 group-hover:rotate-12 transition-transform">
                <span className="text-white font-black text-lg">T</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter text-white">TARGOŠ</span>
                <span className="text-[10px] font-bold text-orange-500 tracking-widest uppercase">Stavebné práce</span>
              </div>
            </div>
            <p className="text-gray-500 max-w-sm leading-relaxed font-light text-sm italic">
              "Kvalita nie je náhoda, ale výsledok premysleného úsilia a 30-ročných skúseností na slovenskom trhu."
            </p>
          </div>
          
          <div className="text-left">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Navigácia</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><button type="button" onClick={() => handleLinkClick('about')} className="hover:text-orange-500 transition-colors uppercase tracking-widest text-[11px] font-bold">O nás</button></li>
              <li><button type="button" onClick={() => handleLinkClick('services')} className="hover:text-orange-500 transition-colors uppercase tracking-widest text-[11px] font-bold">Služby</button></li>
              <li><button type="button" onClick={() => handleLinkClick('portfolio')} className="hover:text-orange-500 transition-colors uppercase tracking-widest text-[11px] font-bold">Realizácie</button></li>
              <li><button type="button" onClick={() => handleLinkClick('contact')} className="hover:text-orange-500 transition-colors uppercase tracking-widest text-[11px] font-bold">Kontakt</button></li>
            </ul>
          </div>
          
          <div className="text-left">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8">Interné</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><button type="button" onClick={() => handleLinkClick('admin')} className="text-zinc-800 hover:text-orange-600 transition-colors uppercase tracking-widest text-[9px] font-black">Správa obsahu</button></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-gray-700 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} TARGOŠ s.r.o.</p>
          <div className="flex space-x-8">
            <button type="button" onClick={() => handleLinkClick('gdpr')} className="hover:text-orange-500 transition-colors">GDPR</button>
            <button type="button" onClick={() => handleLinkClick('cookies')} className="hover:text-orange-500 transition-colors">Cookies</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
