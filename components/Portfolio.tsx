
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: string | number;
  title: string;
  loc: string;
  img: string;
  gallery: string[];
  desc: string;
  cost: string;
  duration: string;
  year: string;
  scope: string;
  process: string; // Format: "Title | Desc; Title | Desc"
}

interface PortfolioProps {
  projects: Project[];
}

const Portfolio: React.FC<PortfolioProps> = ({ projects }) => {
  const navigate = useNavigate();

  if (!projects || projects.length === 0) return null;

  return (
    <section id="portfolio" className="py-32 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 text-left">
          <div className="animate-in slide-in-from-left duration-1000">
            <h2 className="text-orange-500 font-black uppercase tracking-[0.3em] text-xs mb-4">Naša práca</h2>
            <h3 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase">NAŠE REALIZÁCIE</h3>
          </div>
          <p className="text-gray-500 max-w-sm font-light text-sm italic">
            Pozrite si detailnú chronológiu našich prác. Transparentne ukazujeme postupy, materiály aj finálne náklady projektov.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p) => {
            // Slug z názvu
            const slug = p.title
              .toString()
              .normalize('NFD')
              .replace(/\p{Diacritic}/gu, '')
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-+|-+$/g, '')
              .replace(/-+/g, '-');
            return (
              <div 
                key={p.id} 
                onClick={() => navigate(`/realizacie/${slug}`)}
                className="group relative overflow-hidden bg-zinc-900 aspect-[4/5] rounded-sm cursor-pointer border border-zinc-800 hover:border-orange-500/50 transition-all duration-700 hover:-translate-y-2 text-left"
              >
                <img src={p.img} alt={p.title} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform group-hover:-translate-y-2">
                  <div className="flex items-center space-x-3 mb-3 text-left">
                    <span className="h-px w-6 bg-orange-500"></span>
                    <p className="text-orange-500 font-black text-[10px] uppercase tracking-widest">{p.loc}</p>
                  </div>
                  <h4 className="text-2xl font-black text-white tracking-tight leading-tight mb-4">{p.title}</h4>
                  <div className="flex space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                     <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{p.cost}</div>
                     <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">•</div>
                     <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{p.duration}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
