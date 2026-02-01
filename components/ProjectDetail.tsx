
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
    <section className="py-16 pt-32 md:py-24 bg-black min-h-screen">
      <div className="max-w-6xl pt-32 mx-auto px-4">
        <button onClick={() => navigate(-1)} className="mb-8 text-orange-500 hover:underline">← Späť na realizácie</button>
        <div className="flex flex-col md:flex-row gap-12">
          {/* LEFT COLUMN: Images */}
          <div className="md:w-1/2 flex flex-col gap-6">
            {project.img && (
              <img
                src={project.img}
                alt={project.title}
                className="w-full aspect-video object-cover rounded-lg shadow-2xl border-2 border-zinc-900 cursor-pointer hover:border-orange-500 transition-all"
                onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }}
              />
            )}
            {project.gallery && Array.isArray(project.gallery) && project.gallery.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {project.gallery.slice(0, 4).map((url: string, i: number) => (
                  <img
                    key={i}
                    src={url}
                    alt={`Galéria ${i+1}`}
                    className="w-full h-32 object-cover rounded border-2 border-zinc-800 cursor-pointer hover:border-orange-500 transition-all shadow-lg"
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
              {project.loc && <span className="text-orange-500 font-black text-xs uppercase tracking-widest">{project.loc}</span>}
              {project.year && <><span className="text-zinc-700">•</span><span className="text-orange-500 font-black text-xs uppercase tracking-widest">{project.year}</span></>}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter leading-[1.05] uppercase">{project.title}</h1>
            {project.desc && (
              <p className="text-zinc-300 text-lg leading-relaxed font-light italic border-l-4 border-orange-600 pl-6 mb-4">{project.desc}</p>
            )}
            <div className="flex gap-4 mb-4">
              {project.cost && (
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-6 py-4 flex flex-col items-center min-w-[120px]">
                  <span className="text-zinc-400 text-xs uppercase mb-1">Objem investície</span>
                  <span className="text-orange-500 font-black text-2xl">{project.cost}</span>
                </div>
              )}
              {project.duration && (
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-6 py-4 flex flex-col items-center min-w-[120px]">
                  <span className="text-zinc-400 text-xs uppercase mb-1">Čas realizácie</span>
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
                        <h6 className="text-white font-black uppercase text-xs tracking-[0.1em] mb-1 group-hover:text-orange-500 transition-colors">{step.title}</h6>
                        <p className="text-zinc-400 text-xs leading-relaxed font-light">{step.desc}</p>
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
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
                  <p className="text-zinc-400 text-sm whitespace-pre-line">{project.scope}</p>
                </div>
              </>
            )}
          </div>

          {/* Materials/Technologies */}
          <div className="col-span-1">
            {project.materials && (
              <>
                <h3 className="text-orange-500 font-black uppercase text-xs mb-6 tracking-widest">Použité materiály / technológie</h3>
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
                  <p className="text-zinc-400 text-sm whitespace-pre-line">{project.materials}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;
