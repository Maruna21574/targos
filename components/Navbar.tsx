
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  scrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Domov', path: '/' },
    { name: 'O nás', path: '/o-nas' },
    { name: 'Služby', path: '/sluzby' },
    { name: 'Realizácie', path: '/realizacie' },
    { name: 'AI Poradca', path: '/ai' },
    { name: 'Kontakt', path: '/kontakt' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/95 backdrop-blur-lg py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 cursor-pointer group">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <img 
                src="/images/logo_targos.png" 
                alt="TARGOŠ logo" 
                className="w-28 h-28 object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-2xl font-black tracking-tighter leading-none group-hover:text-orange-500 transition-colors">
                TARGOŠ
              </span>
              <span className="text-[10px] font-bold text-orange-500 tracking-[0.2em] uppercase">Stavebné práce</span>
            </div>
          </Link>

          <div className="hidden lg:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`transition-all duration-300 font-bold text-xs uppercase tracking-widest ${location.pathname === link.path ? 'text-orange-500' : 'text-gray-400 hover:text-white'}`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/cenova-ponuka"
              onClick={() => setIsOpen(false)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-sm font-black transition-all hover:scale-105 active:scale-95 text-xs tracking-widest orange-glow"
            >
              CENOVÁ PONUKA
            </Link>
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
        <>
          {/* Overlay for background opacity */}
          <div className="fixed inset-0 z-40 bg-black/70 transition-opacity duration-300" onClick={() => setIsOpen(false)} />
          {/* Mobile nav menu - slide in from right */}
          <div className="fixed top-0 right-0 h-full w-full bg-zinc-950/95 backdrop-blur-xl border-l border-orange-500/20 z-50 shadow-2xl animate-in slide-in-from-right-32 duration-300 flex flex-col">
            <div className="flex items-center justify-between px-4 pt-6 pb-2">
              <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center space-x-2">
                <img src="/images/logo_targos.png" alt="TARGOŠ logo" className="w-16 h-16 object-contain" />
                <span className="text-xl font-black tracking-tighter text-white">TARGOŠ</span>
              </Link>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-orange-500 p-2">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-4 pt-2 pb-6 space-y-1 flex-1 overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block w-full text-left px-3 py-4 text-base font-black tracking-widest uppercase rounded transition-colors duration-200 ${location.pathname === link.path ? 'text-orange-500 bg-orange-500/10' : 'text-gray-300 hover:bg-zinc-900/40 hover:text-orange-500'}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="px-4 pb-8">
              <Link
                to="/cenova-ponuka"
                onClick={() => setIsOpen(false)}
                className="block w-full bg-orange-600 hover:bg-orange-700 text-white px-6 py-4 rounded-lg font-black transition-all hover:scale-105 active:scale-95 text-base tracking-widest text-center orange-glow shadow-lg"
              >
                CENOVÁ PONUKA
              </Link>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
