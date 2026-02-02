
import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { useParams, useNavigate } from 'react-router-dom';

interface ProjectDetailProps {
  projects: any[];
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projects }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  function slugify(text: string) {
    return text
      .toString()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/-+/g, '-');
  }
  const project = projects.find(p => slugify(p.title) === slug);

  let processSteps: { title: string; desc: string }[] = [];
  if (project?.process && typeof project.process === 'string') {
    processSteps = project.process.split(';').map((item: string) => {
      const [title, desc] = item.split('|').map((s) => s?.trim() || '');
      return { title, desc };
    }).filter(s => s.title);
  }

  // All images for lightbox (main + gallery)
  const allImages = [project.img, ...(project.gallery && Array.isArray(project.gallery) ? project.gallery : [])].filter(Boolean);

  return (
    <section className="py-16 pt-16 md:pt-32 md:py-24 bg-white dark:bg-black min-h-screen">
      <div className="max-w-6xl pt-32 mx-auto px-4">
        {/* Horné tlačidlo späť */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 dark:bg-zinc-900 border border-orange-600 text-orange-500 font-black uppercase tracking-widest shadow-lg hover:bg-orange-600 hover:text-white hover:shadow-orange-500/30 transition-all text-xs group"
        >
          <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Späť na realizácie
        </button>
        <div className="flex flex-col md:flex-row gap-12">
          {/* LEFT COLUMN: Images */}
          <div className="md:w-1/2 flex flex-col gap-6">
            {project.img && (
              <img
                src={project.img} loading="lazy"
                alt={project.title}
                className="w-full aspect-video object-cover rounded-lg shadow-2xl border-2 border-gray-300 dark:border-zinc-900 cursor-pointer hover:border-orange-500 transition-all grayscale-[10%] opacity-90 hover:opacity-100 hover:grayscale-0"
                onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }}
              />
            )}
            {project.gallery && Array.isArray(project.gallery) && project.gallery.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {project.gallery.slice(0, 4).map((url: string, i: number) => (
                  <img
                    key={i} loading="lazy"
                    src={url}
                    alt={`Galéria ${i+1}`}
                    className="w-full h-32 object-cover rounded border-2 border-gray-200 dark:border-zinc-800 cursor-pointer hover:border-orange-500 transition-all shadow-lg grayscale-[20%] opacity-80 hover:opacity-100 hover:grayscale-0"
                    onClick={() => { setLightboxIndex(i + 1); setLightboxOpen(true); }}
                  />
                ))}
              </div>
            )}
            <Lightbox
              open={lightboxOpen}
              close={() => setLightboxOpen(false)}
              slides={allImages.map((src: string) => ({ src }))}
              index={lightboxIndex}
            />
          </div>

          {/* RIGHT COLUMN: Info */}
          <div className="md:w-1/2 flex flex-col gap-6">
            <div className="flex flex-wrap gap-2 items-center mb-2">
              {project.loc && <span className="text-orange-500 font-black text-xs uppercase tracking-widest dark:text-white text-gray-900 drop-shadow-lg">{project.loc}</span>}
              {project.year && <><span className="text-gray-500 dark:text-zinc-700">•</span><span className="text-orange-500 font-black text-xs uppercase tracking-widest dark:text-white text-gray-900 drop-shadow-lg">{project.year}</span></>}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-2 tracking-tighter leading-[1.05] uppercase drop-shadow-lg">{project.title}</h1>
            {project.desc && (
              <p className="text-gray-700 dark:text-zinc-300 text-lg leading-relaxed font-light italic border-l-4 border-orange-600 pl-6 mb-4">{project.desc}</p>
            )}
            <div className="flex gap-4 mb-4">
              {project.cost && (
                <div className="bg-gray-100 dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 rounded-lg px-6 py-4 flex flex-col items-center min-w-[120px]">
                  <span className="text-gray-500 dark:text-zinc-400 text-xs uppercase mb-1">Objem investície</span>
                  <span className="text-orange-500 font-black text-2xl">{project.cost}</span>
                </div>
              )}
              {project.duration && (
                <div className="bg-gray-100 dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 rounded-lg px-6 py-4 flex flex-col items-center min-w-[120px]">
                  <span className="text-gray-500 dark:text-zinc-400 text-xs uppercase mb-1">Čas realizácie</span>
                  <span className="text-orange-500 font-black text-2xl">{project.duration}</span>
                </div>
              )}
            </div>
            {/* ID removed as requested */}
          </div>
        </div>

        {/* BOTTOM SECTIONS: Timeline, Scope, Materials */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {/* Timeline */}
          <div className="col-span-1">
            {processSteps.length > 0 && (
              <>
                <h3 className="text-orange-500 font-black uppercase text-xs mb-6 tracking-widest">Chronológia a priebeh realizácie</h3>
                <div className="space-y-8">
                  {processSteps.map((step, i) => (
                    <div key={i} className="flex space-x-4 group">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-zinc-900 border-2 border-orange-600 flex items-center justify-center text-orange-500 font-black text-xs group-hover:bg-orange-600 group-hover:text-white transition-all duration-500 shadow-[0_0_10px_rgba(234,88,12,0.2)]">
                          {i + 1}
                        </div>
                        {i < processSteps.length - 1 && (
                          <div className="w-px h-8 bg-gradient-to-b from-orange-600/50 to-zinc-800 my-1"></div>
                        )}
                      </div>
                      <div className="pt-1 text-left pb-2">
                        <h6 className="font-black uppercase text-xs tracking-[0.1em] mb-1 group-hover:text-orange-500 transition-colors drop-shadow-lg dark:text-white text-gray-900">{step.title}</h6>
                        <p className="text-xs leading-relaxed font-light dark:text-gray-300 text-gray-700">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Scope (Rozsah prác) */}
          <div className="col-span-1">
            {project.scope && (
              <>
                <h3 className="text-orange-500 font-black uppercase text-xs mb-6 tracking-widest">Realizovaný rozsah</h3>
                <div className="bg-gray-100 dark:bg-zinc-900/50 border border-gray-300 dark:border-zinc-800 rounded-lg p-4">
                  <p className="text-gray-700 dark:text-zinc-400 text-sm whitespace-pre-line">{project.scope}</p>
                </div>
              </>
            )}
          </div>

          {/* Materials/Technologies */}
          <div className="col-span-1">
            {project.materials && (
              <>
                <h3 className="text-orange-500 font-black uppercase text-xs mb-6 tracking-widest">Použité materiály / technológie</h3>
                <div className="bg-gray-100 dark:bg-zinc-900/50 border border-gray-300 dark:border-zinc-800 rounded-lg p-4">
                  <p className="text-gray-700 dark:text-zinc-400 text-sm whitespace-pre-line">{project.materials}</p>
                </div>
              </>
            )}
          </div>
        </div>
        {/* Dolné tlačidlo späť */}
        <div className="flex justify-center mt-16">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-8 py-4 rounded-full bg-gray-100 dark:bg-zinc-900 border border-orange-600 text-orange-500 font-black uppercase tracking-widest shadow-lg hover:bg-orange-600 hover:text-white hover:shadow-orange-500/30 transition-all text-sm group"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Späť na realizácie
          </button>
        </div>

        {/* Ďalšie realizácie */}
        {projects.length > 1 && (
          <div className="mt-24">
            <h2 className="text-3xl md:text-4xl font-black dark:text-white text-gray-900 mb-10 tracking-tighter uppercase text-center">Ďalšie realizácie</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {projects.filter(p => slugify(p.title) !== slug).slice(0, 3).map((p, i) => {
                const pSlug = slugify(p.title);
                return (
                  <div
                    key={pSlug}
                    className="group bg-gray-100/80 dark:bg-zinc-900/60 border border-gray-300 dark:border-zinc-800 rounded-lg overflow-hidden shadow-lg hover:shadow-orange-500/20 transition-all cursor-pointer flex flex-col"
                    onClick={() => navigate(`/realizacie/${pSlug}`)}
                    tabIndex={0}
                    role="button"
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(`/realizacie/${pSlug}`); }}
                  >
                    {p.img && (
                      <img
                        src={p.img} loading="lazy"
                        alt={p.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-black dark:text-white text-gray-900 mb-2 group-hover:text-orange-500 transition-colors drop-shadow-lg">{p.title}</h3>
                      {p.loc && <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-1 dark:text-white text-gray-900 drop-shadow-lg">{p.loc}</span>}
                      {p.desc && <p className="text-sm mt-2 line-clamp-2 dark:text-gray-300 text-gray-700">{p.desc}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectDetail;
