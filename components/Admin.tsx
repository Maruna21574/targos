
import React, { useState, useEffect } from 'react';

interface Project {
  id: number;
  title: string;
  loc: string;
  img: string;
  gallery: string[];
  desc: string;
  cost: string;
  duration: string;
  year: string;
  scope: string;
  process: string;
}

interface AdminProps {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
}

const Admin: React.FC<AdminProps> = ({ projects, setProjects }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ user: '', pass: '' });
  const [error, setError] = useState('');
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '', loc: '', img: '', desc: '', cost: '', duration: '', year: new Date().getFullYear().toString(), 
    gallery: [], scope: '', process: ''
  });

  const [galleryText, setGalleryText] = useState('');

  // Check for existing session
  useEffect(() => {
    const authStatus = sessionStorage.getItem('targos_auth');
    if (authStatus === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.user === 'Targos' && loginForm.pass === 'Targos2026*') {
      setIsAuthenticated(true);
      sessionStorage.setItem('targos_auth', 'true');
      setError('');
    } else {
      setError('Nesprávne prihlasovacie meno alebo heslo.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('targos_auth');
  };

  const handleEditClick = (project: Project) => {
    setEditingId(project.id);
    setNewProject(project);
    setGalleryText(project.gallery.join('\n'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNewProject({ 
      title: '', loc: '', img: '', desc: '', cost: '', duration: '', 
      year: new Date().getFullYear().toString(), gallery: [], scope: '', process: '' 
    });
    setGalleryText('');
  };

  const handleAddOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const galleryArray = galleryText.split('\n').map(url => url.trim()).filter(url => url !== '');

    if (editingId !== null) {
      const updatedProjects = projects.map(p => 
        p.id === editingId ? { ...newProject, id: editingId, gallery: galleryArray } as Project : p
      );
      setProjects(updatedProjects);
      alert('Realizácia úspešne aktualizovaná!');
      setEditingId(null);
    } else {
      const projectToAdd = {
        ...newProject,
        id: Date.now(),
        gallery: galleryArray
      } as Project;
      setProjects([projectToAdd, ...projects]);
      alert('Nová realizácia uverejnená!');
    }
    
    setNewProject({ 
      title: '', loc: '', img: '', desc: '', cost: '', duration: '', 
      year: new Date().getFullYear().toString(), gallery: [], scope: '', process: '' 
    });
    setGalleryText('');
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Naozaj chcete vymazať túto realizáciu?')) {
      setProjects(projects.filter(p => p.id !== id));
      if (editingId === id) cancelEdit();
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="max-w-md w-full animate-in zoom-in duration-500">
          <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-sm shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-600 to-transparent"></div>
            
            <div className="flex flex-col items-center mb-10">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-orange-600/20">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Admin Vstup</h1>
              <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-[0.2em] mt-2">Prístup len pre oprávnené osoby</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Meno</label>
                <input 
                  type="text" 
                  required 
                  value={loginForm.user}
                  onChange={e => setLoginForm({...loginForm, user: e.target.value})}
                  className="w-full bg-black border border-zinc-800 p-4 text-white outline-none focus:border-orange-600 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Heslo</label>
                <input 
                  type="password" 
                  required 
                  value={loginForm.pass}
                  onChange={e => setLoginForm({...loginForm, pass: e.target.value})}
                  className="w-full bg-black border border-zinc-800 p-4 text-white outline-none focus:border-orange-600 transition-colors"
                />
              </div>
              
              {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest animate-pulse">{error}</p>}
              
              <button 
                type="submit" 
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-4 uppercase text-xs tracking-[0.3em] transition-all transform hover:-translate-y-1 shadow-2xl shadow-orange-600/20"
              >
                Prihlásiť sa
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-zinc-950 pt-32 pb-20 px-4 text-left">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-12 border-b border-zinc-800 pb-8">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Správa realizácií</h1>
            <p className="text-zinc-500 text-sm mt-2">Vstúpili ste ako správca <span className="text-orange-500 font-bold">Targoš</span>.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-orange-600/10 border border-orange-600/30 text-orange-500 px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest">
              {editingId !== null ? 'Režim úpravy' : 'Aktívne prihlásený'}
            </div>
            <button 
              onClick={handleLogout}
              className="text-zinc-600 hover:text-white transition-colors"
              title="Odhlásiť sa"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>

        <section className="bg-zinc-900 p-10 rounded-sm border border-zinc-800 mb-16 shadow-2xl relative">
          <h2 className="text-lg font-black text-white mb-10 uppercase tracking-[0.2em] border-l-4 border-orange-600 pl-4">
            {editingId !== null ? 'Upraviť projekt' : 'Nová Prípadová Štúdia'}
          </h2>
          
          <form onSubmit={handleAddOrUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Názov stavby</label>
              <input required value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className="w-full bg-black border border-zinc-800 p-4 text-white outline-none focus:border-orange-600 transition-colors" placeholder="napr. Luxusná Vila Koliba" />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Lokalita a Rok</label>
              <div className="grid grid-cols-2 gap-4">
                <input required value={newProject.loc} onChange={e => setNewProject({...newProject, loc: e.target.value})} className="bg-black border border-zinc-800 p-4 text-white outline-none focus:border-orange-600 transition-colors" placeholder="Mesto" />
                <input required value={newProject.year} onChange={e => setNewProject({...newProject, year: e.target.value})} className="bg-black border border-zinc-800 p-4 text-white outline-none focus:border-orange-600 transition-colors" placeholder="Rok" />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">URL Hlavného obrázka</label>
              <input required value={newProject.img} onChange={e => setNewProject({...newProject, img: e.target.value})} className="w-full bg-black border border-zinc-800 p-4 text-white outline-none focus:border-orange-600 transition-colors" placeholder="https://images.unsplash.com/..." />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Galéria obrázkov (Vložte URL adresy, každú na nový riadok)</label>
              <textarea value={galleryText} onChange={e => setGalleryText(e.target.value)} className="w-full bg-black border border-zinc-800 p-4 text-white outline-none focus:border-orange-600 transition-colors" rows={4} placeholder="https://url1.jpg&#10;https://url2.jpg" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Stručný popis projektu (výzvy, ciele)</label>
              <textarea required value={newProject.desc} onChange={e => setNewProject({...newProject, desc: e.target.value})} className="w-full bg-black border border-zinc-800 p-4 text-white outline-none focus:border-orange-600 transition-colors" rows={3} placeholder="Popíšte priebeh stavby..." />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Celková investícia</label>
              <input value={newProject.cost} onChange={e => setNewProject({...newProject, cost: e.target.value})} className="w-full bg-black border border-zinc-800 p-4 text-white outline-none focus:border-orange-600 transition-colors" placeholder="napr. 120 000 €" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Čas realizácie</label>
              <input value={newProject.duration} onChange={e => setNewProject({...newProject, duration: e.target.value})} className="w-full bg-black border border-zinc-800 p-4 text-white outline-none focus:border-orange-600 transition-colors" placeholder="napr. 8 mesiacov" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Rozsah prác (oddeľte čiarkou)</label>
              <input value={newProject.scope} onChange={e => setNewProject({...newProject, scope: e.target.value})} className="w-full bg-black border border-zinc-800 p-4 text-white outline-none focus:border-orange-600 transition-colors" placeholder="Murárske práce, Sadrokartóny, Fasáda..." />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Časová os (Formát: Názov kroku | Detailný popis; Ďalší krok | Popis...)</label>
              <textarea value={newProject.process} onChange={e => setNewProject({...newProject, process: e.target.value})} className="w-full bg-black border border-zinc-800 p-4 text-white outline-none focus:border-orange-600 transition-colors" rows={5} placeholder="1. Výkopové práce | Detailný popis čo sa robilo...; 2. Hrubá stavba | Použitý materiál..." />
            </div>

            <div className="md:col-span-2 flex space-x-4">
              <button type="submit" className="flex-grow bg-orange-600 hover:bg-orange-700 text-white font-black py-5 uppercase text-xs tracking-[0.3em] transition-all transform hover:-translate-y-1 shadow-2xl shadow-orange-600/20">
                {editingId !== null ? 'Aktualizovať realizáciu' : 'Uverejniť realizáciu'}
              </button>
              {editingId !== null && (
                <button type="button" onClick={cancelEdit} className="bg-zinc-800 hover:bg-zinc-700 text-white font-black py-5 px-8 uppercase text-xs tracking-[0.3em] transition-all">
                  Zrušiť
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="space-y-4">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-lg font-black text-white uppercase tracking-[0.2em]">Aktuálne realizácie ({projects.length})</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {projects.map(p => (
              <div key={p.id} className={`bg-zinc-900 p-6 flex items-center justify-between border ${editingId === p.id ? 'border-orange-600' : 'border-zinc-800'} group hover:border-zinc-700 transition-all`}>
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-black rounded-sm overflow-hidden border border-zinc-800">
                    <img src={p.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="Mini" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-white font-black uppercase text-sm">{p.title}</h3>
                    <div className="flex space-x-3 mt-1">
                      <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">{p.loc}</p>
                      <p className="text-orange-500 text-[10px] uppercase font-bold tracking-widest">{p.cost}</p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleEditClick(p)} 
                    className="bg-zinc-950 hover:bg-orange-600 text-zinc-600 hover:text-white p-3 rounded-sm border border-zinc-800 transition-all flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="bg-zinc-950 hover:bg-red-950 text-zinc-600 hover:text-red-500 p-3 rounded-sm border border-zinc-800 transition-all">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admin;
