import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  setActivePage: (page: string) => void;
}

const Hero: React.FC<HeroProps> = ({ setActivePage }) => {
  const navigate = useNavigate();
  return (
    <div className="relative h-screen flex items-center overflow-hidden bg-white dark:bg-black">
      {/* Video Background Container */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover opacity-75 contrast-125 saturate-110 dark:opacity-80 dark:contrast-125 dark:saturate-100 transition-all duration-500"
          poster="/images/video_hp.jpg"
        >
          <source 
            src="/images/video_hp.mp4" loading="lazy"
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>

        {/* Jemnejší overlay v light mode, silnejší v dark mode */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/0 to-transparent dark:from-black/80 dark:via-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-black/5 dark:from-black/80 dark:via-transparent dark:to-black/20"></div>

        {/* Biely glow v light mode pre zvýraznenie videa */}
        <div className="absolute inset-0 pointer-events-none hidden dark:block" />
        <div className="absolute inset-0 pointer-events-none block dark:hidden">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vh] rounded-3xl blur-2xl bg-white/30 opacity-40"></div>
        </div>

        {/* Animated Glow Accent */}
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-orange-600/10 blur-[150px] rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-orange-700/90 border border-orange-900 shadow mb-8 animate-in fade-in slide-in-from-left duration-700">
            <span className="flex h-2 w-2 rounded-full bg-white animate-pulse"></span>
            <span className="text-white font-bold text-[10px] md:text-xs uppercase tracking-[0.28em]">Tradícia od roku 1994</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black dark:text-white text-gray-900 leading-[0.95] mb-8 tracking-tighter animate-in fade-in slide-in-from-bottom duration-1000">
            PLNÍME <br />
            <span className="text-gradient-orange">VAŠE SNY.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-300 mb-12 leading-relaxed font-light max-w-xl animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
            <span className="text-gray-900 font-semibold dark:text-gray-300">Kompletné rekonštrukcie, novostavby a technické inštalácie.</span> <br />
            <span className="text-orange-700 font-bold dark:text-white">TARGOŠ</span>
            <span className="text-gray-900 font-semibold dark:text-gray-300"> – Kvalita potvrdená časom.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
            <a 
              href="/cenova-ponuka"
              className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-sm font-black text-xs uppercase tracking-widest transition-all transform hover:-translate-y-1 shadow-2xl shadow-orange-600/40 text-center"
            >
              Nezáväzná kalkulácia
            </a>
            <button
              className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-sm font-black text-xs uppercase tracking-widest transition-all transform hover:-translate-y-1 shadow-2xl shadow-orange-600/40 text-center"
              onClick={() => navigate('/sluzby')}
            >
              Naše služby
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator with orange glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 opacity-60">
        <div className="w-px h-16 bg-gradient-to-b from-orange-500 to-transparent"></div>
      </div>

      {/* BIELY GRADIENT ZOSPODU PRE LIGHT MODE */}
      <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-32 lg:h-40 bg-gradient-to-b from-transparent to-white dark:to-black transition-all duration-500" />
    </div>
  );
};

export default Hero;
