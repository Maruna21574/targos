
import React, { useState } from 'react';

interface NavbarProps {
  scrolled: boolean;
  activePage: string;
  setActivePage: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled, activePage, setActivePage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Domov', id: 'home' },
    { name: 'O nás', id: 'about' },
    { name: 'Služby', id: 'services' },
    { name: 'Realizácie', id: 'portfolio' },
    { name: 'AI Poradca', id: 'ai' },
    { name: 'Kontakt', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    setActivePage(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/95 backdrop-blur-lg py-3 border-b border-orange-500/30' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => handleNavClick('home')}
          >
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-600 to-orange-400 rounded-full group-hover:rotate-12 transition-transform duration-500"></div>
              <div className="absolute inset-[2px] bg-zinc-900 rounded-full flex items-center justify-center overflow-hidden border border-orange-500/50">
                 <span className="text-white font-black text-xl tracking-tighter">T</span>
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-2xl font-black tracking-tighter leading-none group-hover:text-orange-500 transition-colors">
                TARGOŠ
              </span>
              <span className="text-[10px] font-bold text-orange-500 tracking-[0.2em] uppercase">Stavebné práce</span>
            </div>
          </div>

          <div className="hidden lg:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                onClick={() => handleNavClick(link.id)}
                className={`transition-all duration-300 font-bold text-xs uppercase tracking-widest ${activePage === link.id ? 'text-orange-500' : 'text-gray-400 hover:text-white'}`}
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => handleNavClick('contact')}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-sm font-black transition-all hover:scale-105 active:scale-95 text-xs tracking-widest orange-glow"
            >
              CENOVÁ PONUKA
            </button>
          </div>

          <div className="lg:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-zinc-950/95 backdrop-blur-xl border-b border-orange-500/20 absolute top-full left-0 w-full animate-in fade-in slide-in-from-top-4">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`block w-full text-left px-3 py-4 text-sm font-bold tracking-widest uppercase ${activePage === link.id ? 'text-orange-500 bg-orange-500/5' : 'text-gray-400'}`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
