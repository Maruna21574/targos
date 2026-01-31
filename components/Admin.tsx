
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
      alert('Zmeny uložené do prehliadača! Teraz skopírujte kód nižšie do VS Code pre trvalé uloženie.');
      setEditingId(null);
    } else {
      const projectToAdd = {
        ...newProject,
        id: Date.now(),
        gallery: galleryArray
      } as Project;
      setProjects([projectToAdd, ...projects]);
      alert('Nová realizácia pridaná do zoznamu! Teraz skopírujte kód nižšie do VS Code pre trvalé uloženie.');
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

  const copyCodeToClipboard = () => {
    const code = `const DEFAULT_PROJECTS = ${JSON.stringify(projects, null, 2)};`;
    navigator.clipboard.writeText(code);
    alert('Kód bol skopírovaný! Teraz ho vložte do App.tsx vo VS Code namiesto pôvodného DEFAULT_PROJECTS.');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4 text-left">
        <div className="max-w-md w-full animate-in zoom-in duration-500">
          <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-sm shadow-2xl relative overflow-hidden text-center">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-600 to-transparent"></div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase mb-8">Admin Vstup</h1>
            <form onSubmit={handleLogin} className="space-y-6 text-left">
              <input type="text" placeholder="Meno" required value={loginForm.user} onChange={e => setLoginForm({...loginForm, user: e.target.value})} className="w-full bg-black border border-zinc-800 p-4 text-white outline-none focus:border-orange-600" />
              <input type="password" placeholder="Heslo" required value={loginForm.pass} onChange={e => setLoginForm({...loginForm, pass: e.target.value})} className="w-full bg-black border border-zinc-800 p-4 text-white outline-none focus:border-orange-600" />
              {error && <p className="text-red-500 text-[10px] font-bold uppercase">{error}</p>}
              <button type="submit" className="w-full bg-orange-600 text-white font-black py-4 uppercase text-xs tracking-widest shadow-xl transition-all active:scale-95">Prihlásiť sa</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 pt-32 pb-20 px-4 text-left">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-12 border-b border-zinc-800 pb-8">
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Správa webu</h1>
          <button onClick={handleLogout} className="text-zinc-600 hover:text-white uppercase text-[10px] font-bold transition-colors">Odhlásiť</button>
        </div>

        {/* DEPLOYMENT CHECKLIST */}
        <section className="bg-orange-600/10 border border-orange-500/20 p-8 mb-12 rounded-sm">
           <h2 className="text-orange-500 font-black uppercase text-xs tracking-widest mb-6 flex items-center">
             <span className="mr-3">🚀</span> Stav nasadenia a domény
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Zmazať AAAA záznam vo Websupporte", detail: "Kritické pre targos.sk (bez www)", done: true },
                { label: "A záznam (@) na 216.198.79.1", detail: "Hlavné smerovanie domény", done: true },
                { label: "CNAME (www) na cname.vercel-dns.com.", detail: "Smerovanie www verzie", done: true },
                { label: "Wildcard (*) na 216.198.79.1", detail: "Smerovanie preklepov", done: true },
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-4 bg-black/40 p-4 border border-zinc-800/50">
                  <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${item.done ? 'bg-orange-600 border-orange-600' : 'border-zinc-700'}`}>
                    {item.done && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <div>
                    <p className={`text-[11px] font-black uppercase tracking-wider ${item.done ? 'text-white' : 'text-zinc-500'}`}>{item.label}</p>
                    <p className="text-[9px] text-zinc-600 font-bold uppercase mt-1">{item.detail}</p>
                  </div>
                </div>
              ))}
           </div>
        </section>

        {/* Form Section */}
        <section className="bg-zinc-900 p-8 border border-zinc-800 mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-white font-black uppercase border-l-4 border-orange-600 pl-4">
              {editingId !== null ? 'Upraviť projekt' : 'Pridať novú realizáciu'}
            </h2>
            <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest">Zmeny sa ukladajú lokálne</p>
          </div>
          <form onSubmit={handleAddOrUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input required value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className="bg-black border border-zinc-800 p-4 text-white outline-none focus:border-orange-600" placeholder="Názov projektu" />
            <div className="grid grid-cols-2 gap-4">
              <input required value={newProject.loc} onChange={e => setNewProject({...newProject, loc: e.target.value})} className="bg-black border border-zinc-800 p-4 text-white outline-none focus:border-orange-600" placeholder="Lokalita" />
              <input required value={newProject.year} onChange={e => setNewProject({...newProject, year: e.target.value})} className="bg-black border border-zinc-800 p-4 text-white outline-none focus:border-orange-600" placeholder="Rok" />
            </div>
            <input required value={newProject.img} onChange={e => setNewProject({...newProject, img: e.target.value})} className="md:col-span-2 bg-black border border-zinc-800 p-4 text-white outline-none focus:border-orange-600" placeholder="Hlavná fotka (URL)" />
            <textarea value={galleryText} onChange={e => setGalleryText(e.target.value)} className="md:col-span-2 bg-black border border-zinc-800 p-4 text-white outline-none focus:border-orange-600 font-mono text-xs" rows={3} placeholder="Ďalšie fotky (URL, jedna na riadok)" />
            <textarea required value={newProject.desc} onChange={e => setNewProject({...newProject, desc: e.target.value})} className="md:col-span-2 bg-black border border-zinc-800 p-4 text-white outline-none focus:border-orange-600" rows={2} placeholder="Stručný popis projektu" />
            <input value={newProject.cost} onChange={e => setNewProject({...newProject, cost: e.target.value})} className="bg-black border border-zinc-800 p-4 text-white outline-none focus:border-orange-600" placeholder="Cena (napr. 50 000 €)" />
            <input value={newProject.duration} onChange={e => setNewProject({...newProject, duration: e.target.value})} className="bg-black border border-zinc-800 p-4 text-white outline-none focus:border-orange-600" placeholder="Trvanie (napr. 3 mesiace)" />
            <input value={newProject.scope} onChange={e => setNewProject({...newProject, scope: e.target.value})} className="md:col-span-2 bg-black border border-zinc-800 p-4 text-white outline-none focus:border-orange-600" placeholder="Rozsah prác (oddelené čiarkou)" />
            <textarea value={newProject.process} onChange={e => setNewProject({...newProject, process: e.target.value})} className="md:col-span-2 bg-black border border-zinc-800 p-4 text-white outline-none focus:border-orange-600 font-mono text-xs" rows={4} placeholder="Priebeh (Formát: Krok 1 | Popis; Krok 2 | Popis)" />
            
            <div className="md:col-span-2 flex gap-4">
              <button type="submit" className="flex-grow bg-orange-600 text-white font-black py-4 uppercase text-xs tracking-widest shadow-xl transition-all active:scale-95">Uložiť do zoznamu</button>
              {editingId !== null && <button type="button" onClick={cancelEdit} className="bg-zinc-800 text-white px-8 uppercase text-[10px] font-bold">Zrušiť</button>}
            </div>
          </form>
        </section>

        {/* List Section */}
        <section className="mb-12">
          <h2 className="text-white font-black uppercase mb-6 flex items-center">
            Aktuálny zoznam <span className="ml-3 bg-zinc-800 text-orange-500 px-2 py-0.5 rounded-sm text-xs">{projects.length}</span>
          </h2>
          <div className="space-y-4">
            {projects.map(p => (
              <div key={p.id} className="bg-zinc-900/50 p-4 flex items-center justify-between border border-zinc-800 hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-6">
                  <img src={p.img} className="w-14 h-14 object-cover rounded-sm border border-zinc-800" alt="" />
                  <div>
                    <h3 className="text-white font-bold text-sm uppercase tracking-tight">{p.title}</h3>
                    <p className="text-zinc-500 text-[10px] uppercase font-bold mt-1 tracking-widest">{p.loc} • {p.year}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => handleEditClick(p)} className="text-zinc-500 hover:text-white uppercase text-[9px] font-black tracking-widest transition-colors">Upraviť</button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-900 hover:text-red-500 uppercase text-[9px] font-black tracking-widest transition-colors">Zmazať</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CODE GENERATOR */}
        <section className="bg-black border-2 border-dashed border-orange-500/30 p-10 rounded-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-5">
              <svg className="w-32 h-32 text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12"/></svg>
           </div>
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6 relative z-10">
              <div>
                <h2 className="text-orange-500 font-black uppercase tracking-widest text-sm mb-2">Uložiť zmeny natrvalo na doménu</h2>
                <p className="text-zinc-500 text-[11px] font-bold uppercase leading-relaxed max-w-md">Tento kód skopírujte a nahraďte ním celé pole 'DEFAULT_PROJECTS' v súbore App.tsx vo vašom VS Code.</p>
              </div>
              <button 
                onClick={copyCodeToClipboard}
                className="bg-white text-black px-10 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-orange-600 hover:text-white transition-all transform active:scale-95 shadow-2xl"
              >
                Skopírovať kód
              </button>
           </div>
           <div className="bg-zinc-900/80 backdrop-blur-sm p-6 overflow-x-auto rounded-sm border border-zinc-800 relative group">
              <pre className="text-[10px] text-zinc-400 font-mono leading-relaxed select-all">
                {`const DEFAULT_PROJECTS = ${JSON.stringify(projects, null, 2)};`}
              </pre>
              <div className="absolute top-2 right-2 text-[8px] font-black text-zinc-700 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">JSON Formát</div>
           </div>
        </section>
      </div>
    </div>
  );
};

export default Admin;
