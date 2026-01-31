
import React, { useState, useEffect } from 'react';

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
  setActivePage?: (page: string) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ projects, setActivePage }) => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const currentImages = selectedProject !== null 
    ? [projects[selectedProject].img, ...(projects[selectedProject].gallery || [])] 
    : [];

  const handleNextImage = () => {
    if (!lightboxImage) return;
    const currentIndex = currentImages.indexOf(lightboxImage);
    const nextIndex = (currentIndex + 1) % currentImages.length;
    setLightboxImage(currentImages[nextIndex]);
  };

  const handlePrevImage = () => {
    if (!lightboxImage) return;
    const currentIndex = currentImages.indexOf(lightboxImage);
    const prevIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    setLightboxImage(currentImages[prevIndex]);
  };

  const handleConsultationClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProject(null);
    if (setActivePage) {
      setActivePage('contact');
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  useEffect(() => {
    if (selectedProject !== null || lightboxImage !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedProject, lightboxImage]);

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
          {projects.map((p, idx) => (
            <div 
              key={p.id || idx} 
              onClick={() => setSelectedProject(idx)}
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
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedProject !== null && (
        <div className="fixed inset-0 z-[110] bg-black animate-in fade-in duration-500 backdrop-blur-2xl overflow-y-auto">
          <button 
            onClick={() => setSelectedProject(null)} 
            className="fixed top-6 right-6 lg:top-10 lg:right-10 z-[130] bg-orange-600 p-4 rounded-full text-white shadow-2xl hover:bg-orange-700 transition-all hover:rotate-90"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <div className="relative max-w-7xl mx-auto p-4 md:p-12 lg:py-24 min-h-screen text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              <div className="lg:col-span-7 space-y-8">
                 {/* Images only trigger Lightbox */}
                 <div 
                   onClick={(e) => { e.stopPropagation(); setLightboxImage(projects[selectedProject].img); }}
                   className="aspect-video overflow-hidden rounded-sm border border-zinc-800 shadow-2xl bg-zinc-900 cursor-pointer group relative"
                 >
                    <img src={projects[selectedProject].img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Cover" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                    <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity">
                       <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-3 gap-4">
                    {projects[selectedProject].gallery?.map((img, i) => (
                      <div 
                        key={i} 
                        onClick={(e) => { e.stopPropagation(); setLightboxImage(img); }}
                        className="aspect-square overflow-hidden rounded-sm border border-zinc-900 hover:border-orange-500/50 transition-colors cursor-pointer group relative"
                      >
                        <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={`Gallery ${i}`} />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                        </div>
                      </div>
                    ))}
                 </div>

                 {/* New Detailed Chronology UI */}
                 {projects[selectedProject].process && (
                   <div className="bg-zinc-900/50 p-8 border border-zinc-800 rounded-sm">
                      <h5 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-10 border-b border-zinc-800 pb-4">Chronológia a priebeh realizácie</h5>
                      <div className="space-y-12">
                        {projects[selectedProject].process.split(';').map((item, i) => {
                          const [title, description] = item.split('|').map(s => s.trim());
                          return (
                            <div key={i} className="flex space-x-8 group">
                              <div className="flex flex-col items-center">
                                <div className="w-12 h-12 rounded-full bg-zinc-900 border-2 border-orange-600 flex items-center justify-center text-orange-500 font-black text-sm group-hover:bg-orange-600 group-hover:text-white transition-all duration-500 shadow-[0_0_15px_rgba(234,88,12,0.2)]">
                                  {i + 1}
                                </div>
                                {i < projects[selectedProject].process.split(';').length - 1 && (
                                  <div className="w-px h-full bg-gradient-to-b from-orange-600/50 to-zinc-800 my-4"></div>
                                )}
                              </div>
                              <div className="pt-2 text-left pb-4">
                                <h6 className="text-white font-black uppercase text-[13px] tracking-[0.1em] mb-2 group-hover:text-orange-500 transition-colors">{title}</h6>
                                <p className="text-zinc-400 text-sm leading-relaxed font-light">{description}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                   </div>
                 )}
              </div>

              <div className="lg:col-span-5 flex flex-col pt-4">
                <div className="inline-flex items-center space-x-2 text-orange-500 font-black text-[10px] uppercase tracking-widest mb-4">
                   <span>{projects[selectedProject].loc}</span>
                   <span>•</span>
                   <span>{projects[selectedProject].year}</span>
                </div>
                <h4 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-[0.9] uppercase">
                  {projects[selectedProject].title}
                </h4>
                
                <p className="text-zinc-400 text-lg leading-relaxed font-light mb-12 italic border-l-2 border-orange-600 pl-6">
                  "{projects[selectedProject].desc}"
                </p>

                <div className="grid grid-cols-2 gap-px bg-zinc-800 border border-zinc-800 rounded-sm overflow-hidden mb-12">
                   <div className="bg-zinc-900 p-8 text-left">
                      <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest mb-1">Objem investície</p>
                      <p className="text-3xl font-black text-orange-500">{projects[selectedProject].cost}</p>
                   </div>
                   <div className="bg-zinc-900 p-8 text-left">
                      <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest mb-1">Čas realizácie</p>
                      <p className="text-3xl font-black text-white">{projects[selectedProject].duration}</p>
                   </div>
                </div>

                {projects[selectedProject].scope && (
                  <div className="mb-12 text-left">
                    <h5 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-6">Realizovaný rozsah</h5>
                    <div className="flex flex-wrap gap-2">
                      {projects[selectedProject].scope.split(',').map((s, i) => (
                        <span key={i} className="bg-zinc-900 border border-zinc-800 px-4 py-2 text-[10px] font-bold text-zinc-300 uppercase tracking-widest rounded-full">
                          {s.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-auto pt-12">
                   {/* This button only handles navigation, stops propagation to prevent triggering image-based logic if any */}
                   <button 
                     onClick={handleConsultationClick}
                     className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 font-black uppercase text-xs tracking-widest transition-all shadow-2xl shadow-orange-600/30 orange-glow"
                   >
                     Chcem nezáväznú kalkuláciu
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {lightboxImage && (
        <div 
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setLightboxImage(null)}
        >
           <button 
             onClick={() => setLightboxImage(null)} 
             className="absolute top-10 right-10 text-white hover:text-orange-500 z-[210] p-4 bg-black/20 rounded-full"
           >
             <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
           </button>
           
           <button 
             onClick={(e) => { e.stopPropagation(); handlePrevImage(); }} 
             className="absolute left-4 lg:left-10 text-white/30 hover:text-white p-4 transition-all z-[210]"
           >
             <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
           </button>
           
           <div onClick={(e) => e.stopPropagation()} className="relative max-w-full max-h-[90vh]">
             <img 
               src={lightboxImage} 
               className="max-w-full max-h-[90vh] object-contain shadow-2xl border border-zinc-800 animate-in zoom-in-95 duration-500" 
               alt="Lightbox" 
             />
             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 px-6 py-2 rounded-full text-zinc-400 font-black text-[10px] uppercase tracking-widest">
               {currentImages.indexOf(lightboxImage) + 1} / {currentImages.length}
             </div>
           </div>
           
           <button 
             onClick={(e) => { e.stopPropagation(); handleNextImage(); }} 
             className="absolute right-4 lg:right-10 text-white/30 hover:text-white p-4 transition-all z-[210]"
           >
             <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
           </button>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
