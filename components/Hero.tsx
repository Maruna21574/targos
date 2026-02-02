import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  setActivePage: (page: string) => void;
}

const Hero: React.FC<HeroProps> = ({ setActivePage }) => {
  const navigate = useNavigate();
  return (
    <div className="relative h-screen flex items-center overflow-hidden bg-black">
      {/* Video Background Container */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover opacity-60 grayscale-[40%] contrast-110"
          poster="/images/video_hp.jpg"
        >
          <source 
            src="/images/video_hp.mp4" loading="lazy"
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
        
        {/* Layered Overlays for Depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>
        
        {/* Animated Glow Accent */}
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-orange-600/10 blur-[150px] rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-orange-600/20 border border-orange-500/30 mb-8 animate-in fade-in slide-in-from-left duration-700">
            <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="text-orange-500 font-black text-[10px] uppercase tracking-[0.3em]">Tradícia od roku 1994</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.95] mb-8 tracking-tighter animate-in fade-in slide-in-from-bottom duration-1000">
            PLNÍME <br />
            <span className="text-gradient-orange">VAŠE SNY.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed font-light max-w-xl animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
            Kompletné rekonštrukcie, novostavby a technické inštalácie. <br />
            <span className="text-white font-medium">TARGOŠ</span> – Kvalita potvrdená časom.
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
    </div>
  );
};

export default Hero;
