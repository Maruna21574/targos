import React, { useState, useEffect } from 'react';
import { saveProject, deleteProject, getProjects, uploadImage } from '../services/supabaseService';

// --- REMOVE DUPLICATES BELOW ---

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
  materials: string;
}

interface AdminProps {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  defaultProjects: Project[];
}

const Admin: React.FC<AdminProps> = ({ projects, setProjects }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ user: '', pass: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '', loc: '', img: '', desc: '', cost: '', duration: '', year: new Date().getFullYear().toString(), 
    gallery: [], scope: '', process: '', materials: ''
  });
  const [galleryText, setGalleryText] = useState('');

  // Upload hlavného obrázka s validáciou, náhľadom a drag&drop
  const handleImgUpload = async (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
    let file: File | null = null;
    if ('dataTransfer' in e) {
      // Drag&drop
      e.preventDefault();
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        file = e.dataTransfer.files[0];
      }
    } else if (e.target && (e.target as HTMLInputElement).files && (e.target as HTMLInputElement).files![0]) {
      file = (e.target as HTMLInputElement).files![0];
    }
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Súbor nie je obrázok!');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Obrázok je príliš veľký (max 5MB).');
        return;
      }
      try {
        const url = await uploadImage(file);
        setNewProject((prev) => ({ ...prev, img: url }));
      } catch (err) {
        alert('Chyba pri nahrávaní obrázka: ' + (err as any).message);
      }
    }
  };

  // Upload obrázkov do galérie (viacero naraz) s validáciou, náhľadom a drag&drop
  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
    let files: FileList | File[] | null = null;
    if ('dataTransfer' in e) {
      // Drag&drop
      e.preventDefault();
      files = e.dataTransfer.files;
    } else if (e.target && (e.target as HTMLInputElement).files && (e.target as HTMLInputElement).files!.length > 0) {
      files = (e.target as HTMLInputElement).files;
    }
    if (files && files.length > 0) {
      const urls = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith('image/')) {
          alert('Súbor nie je obrázok!');
          continue;
        }
        if (file.size > 5 * 1024 * 1024) {
          alert('Obrázok je príliš veľký (max 5MB).');
          continue;
        }
        try {
          const url = await uploadImage(file);
          urls.push(url);
        } catch (err) {
          alert('Chyba pri nahrávaní obrázka: ' + (err as any).message);
        }
      }
      if (urls.length > 0) {
        setGalleryText((prev) => (prev ? prev + '\n' : '') + urls.join('\n'));
      }
    }
  };

  // Odstrániť obrázok z galérie
  const handleRemoveGalleryImg = (url: string) => {
    setGalleryText((prev) => prev.split('\n').filter((u) => u !== url).join('\n'));
  };

  // Posunúť obrázok v galérii vľavo/vpravo
  const handleMoveGalleryImg = (index: number, direction: -1 | 1) => {
    setGalleryText((prev) => {
      const arr = prev.split('\n').filter(Boolean);
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= arr.length) return prev;
      const tmp = arr[index];
      arr[index] = arr[newIndex];
      arr[newIndex] = tmp;
      return arr.join('\n');
    });
  };

  useEffect(() => {
    const authStatus = sessionStorage.getItem('targos_auth');
    if (authStatus === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.user === 'Targos' && loginForm.pass === 'Targos2026*') {
      setIsAuthenticated(true);
      sessionStorage.setItem('targos_auth', 'true');
    } else {
      alert('Nesprávne údaje');
    }
  };

  const refreshData = async () => {
    const data = await getProjects();
    if (data) {
      setProjects(data.map((p: any) => ({ ...p, desc: p.desc_text })));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const galleryArray = galleryText.split('\n').map(url => url.trim()).filter(url => url !== '');
    const projectToSave = {
      ...newProject,
      id: editingId || Date.now(),
      gallery: galleryArray
    };

    const { error } = await saveProject(projectToSave);

    if (error) {
      alert('Chyba pri ukladaní do databázy: ' + error.message);
    } else {
      await refreshData();
      setNewProject({ title: '', loc: '', img: '', desc: '', cost: '', duration: '', year: new Date().getFullYear().toString(), gallery: [], scope: '', process: '' });
      setGalleryText('');
      setEditingId(null);
      alert('Realizácia úspešne uložená pre všetkých návštevníkov!');
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Naozaj chcete natrvalo vymazať túto stavbu z webu?')) {
      const { error } = await deleteProject(id);
      if (error) {
        alert('Chyba pri mazaní: ' + error.message);
      } else {
        await refreshData();
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('targos_auth');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-100 dark:bg-black flex items-center justify-center p-4 text-left transition-colors">
        <div className="max-w-md w-full bg-white/90 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 p-10 rounded-2xl text-center shadow-xl transition-colors">
          <h1 className="text-2xl font-black text-zinc-900 dark:text-white uppercase mb-8">Administrácia Targos</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="text" placeholder="Meno" className="w-full bg-white dark:bg-black border border-zinc-300 dark:border-zinc-800 p-4 text-zinc-900 dark:text-white outline-none focus:border-orange-600 transition-colors" value={loginForm.user} onChange={e => setLoginForm({...loginForm, user: e.target.value})} />
            <input type="password" placeholder="Heslo" className="w-full bg-white dark:bg-black border border-zinc-300 dark:border-zinc-800 p-4 text-zinc-900 dark:text-white outline-none focus:border-orange-600 transition-colors" value={loginForm.pass} onChange={e => setLoginForm({...loginForm, pass: e.target.value})} />
            <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-4 uppercase text-xs tracking-widest shadow-xl transition-all">Vstúpiť</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 pt-32 pb-20 px-4 text-left transition-colors">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex justify-between items-end mb-12 border-b border-zinc-300 dark:border-zinc-800 pb-8 transition-colors">
          <div>
            <h1 className="text-4xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">Databáza realizácií</h1>
            <div className="flex items-center space-x-2 mt-2">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
               <p className="text-green-500 text-[10px] font-black uppercase tracking-widest">Prepojené s ostrou databázou</p>
            </div>
          </div>
          <button onClick={handleLogout} className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white uppercase text-[10px] font-bold transition-colors">Odhlásiť</button>
        </div>

        <section className="bg-white/90 dark:bg-zinc-900 p-8 border border-zinc-300 dark:border-zinc-800 mb-12 shadow-2xl relative overflow-hidden rounded-2xl transition-colors">
          {isSaving && <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-20 flex items-center justify-center text-white font-black uppercase text-xs tracking-[0.3em]">Ukladám do databázy...</div>}
          
          <h2 className="text-zinc-900 dark:text-white font-black uppercase mb-8 border-l-4 border-orange-600 pl-4 transition-colors">
            {editingId !== null ? 'Upraviť záznam' : 'Nová realizácia'}
          </h2>
          
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input required value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className="bg-white dark:bg-black border border-zinc-300 dark:border-zinc-800 p-4 text-zinc-900 dark:text-white outline-none focus:border-orange-600 transition-colors" placeholder="Názov projektu" style={{padding: '10px'}} />
            <div className="grid grid-cols-2 gap-4">
              <input required value={newProject.loc} onChange={e => setNewProject({...newProject, loc: e.target.value})} className="bg-white dark:bg-black border border-zinc-300 dark:border-zinc-800 p-4 text-zinc-900 dark:text-white outline-none focus:border-orange-600 transition-colors" placeholder="Lokalita" style={{padding: '10px'}} />
              <input required value={newProject.year} onChange={e => setNewProject({...newProject, year: e.target.value})} className="bg-white dark:bg-black border border-zinc-300 dark:border-zinc-800 p-4 text-zinc-900 dark:text-white outline-none focus:border-orange-600 transition-colors" placeholder="Rok" style={{padding: '10px'}} />
            </div>
            <div className="md:col-span-2 flex gap-4 items-center">
              <input required value={newProject.img} onChange={e => setNewProject({...newProject, img: e.target.value})} className="flex-grow bg-white dark:bg-black border border-zinc-300 dark:border-zinc-800 p-4 text-zinc-900 dark:text-white outline-none focus:border-orange-600 transition-colors" placeholder="Hlavná fotka (URL)" style={{padding: '10px'}} />
              <div className="relative flex flex-col items-center">
                <button
                  type="button"
                  className="bg-orange-600 text-white px-3 py-1 rounded font-bold text-xs mb-1 hover:bg-orange-700 transition"
                  onClick={() => document.getElementById('main-photo-input')?.click()}
                >
                  Nahrať HLAVNÚ fotku
                </button>
                <input
                  id="main-photo-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImgUpload}
                  style={{ display: 'none' }}
                  title="Nahrať hlavnú fotku"
                />
              </div>
              {newProject.img && (
                <img src={newProject.img} alt="Náhľad" className="w-16 h-16 object-cover rounded border border-zinc-800 ml-2" loading="lazy" />
              )}
            </div>
            <div className="md:col-span-2 flex gap-4 items-start">
              <div className="flex-grow">
                <textarea value={galleryText} onChange={e => setGalleryText(e.target.value)} className="w-full bg-white dark:bg-black border border-zinc-300 dark:border-zinc-800 p-4 text-zinc-900 dark:text-white font-mono text-xs outline-none focus:border-orange-600 transition-colors" rows={3} placeholder="Ďalšie fotky (URL, jedna na riadok)" style={{padding: '10px'}} />
                <button
                  type="button"
                  className="bg-orange-600 text-white px-3 py-1 rounded font-bold text-xs mb-2 hover:bg-orange-700 transition"
                  onClick={() => document.getElementById('gallery-photo-input')?.click()}
                >
                  Nahrať ĎALŠIE fotky
                </button>
                <input
                  id="gallery-photo-input"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryUpload}
                  style={{ display: 'none' }}
                  title="Nahrať ďalšie fotky"
                />
                {/* Náhľady galérie */}
                <div className="flex flex-wrap gap-2 mt-2 min-h-[40px]">
                  {galleryText.split('\n').filter(Boolean).map((url, i, arr) => (
                    <div key={i} className="relative group flex flex-col items-center">
                      <img src={url} alt="Galéria" className="w-16 h-16 object-cover rounded border border-zinc-800" loading="lazy" />
                      <div className="flex gap-1 mt-1">
                        <button type="button" onClick={() => handleMoveGalleryImg(i, -1)} disabled={i === 0} className="bg-zinc-800 text-white text-xs rounded px-1 disabled:opacity-30">←</button>
                        <button type="button" onClick={() => handleMoveGalleryImg(i, 1)} disabled={i === arr.length - 1} className="bg-zinc-800 text-white text-xs rounded px-1 disabled:opacity-30">→</button>
                        <button type="button" onClick={() => handleRemoveGalleryImg(url)} className="bg-black/70 text-white text-xs rounded-full px-1 opacity-80 hover:bg-red-600">×</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <textarea required value={newProject.desc} onChange={e => setNewProject({...newProject, desc: e.target.value})} className="md:col-span-2 bg-white dark:bg-black border border-zinc-300 dark:border-zinc-800 p-4 text-zinc-900 dark:text-white outline-none focus:border-orange-600 transition-colors" rows={2} placeholder="Stručný popis" style={{padding: '10px'}} />
            <textarea value={newProject.process} onChange={e => setNewProject({...newProject, process: e.target.value})} className="md:col-span-2 bg-white dark:bg-black border border-zinc-300 dark:border-zinc-800 p-4 text-zinc-900 dark:text-white outline-none focus:border-orange-600 transition-colors" rows={2} placeholder="Proces realizácie (napr. príprava, výstavba, dokončenie)" style={{padding: '10px'}} />
            <textarea value={newProject.scope} onChange={e => setNewProject({...newProject, scope: e.target.value})} className="md:col-span-2 bg-white dark:bg-black border border-zinc-300 dark:border-zinc-800 p-4 text-zinc-900 dark:text-white outline-none focus:border-orange-600 transition-colors" rows={2} placeholder="Rozsah prác (napr. rekonštrukcia strechy, zateplenie, výmena okien...)" style={{padding: '10px'}} />
            <textarea value={newProject.materials} onChange={e => setNewProject({...newProject, materials: e.target.value})} className="md:col-span-2 bg-white dark:bg-black border border-zinc-300 dark:border-zinc-800 p-4 text-zinc-900 dark:text-white outline-none focus:border-orange-600 transition-colors" rows={2} placeholder="Použité materiály/technológie (napr. Ytong, Baumit, zateplenie EPS, atď.)" style={{padding: '10px'}} />
            <input value={newProject.cost} onChange={e => setNewProject({...newProject, cost: e.target.value})} className="bg-white dark:bg-black border border-zinc-300 dark:border-zinc-800 p-4 text-zinc-900 dark:text-white outline-none focus:border-orange-600 transition-colors" placeholder="Cena" style={{padding: '10px'}} />
            <input value={newProject.duration} onChange={e => setNewProject({...newProject, duration: e.target.value})} className="bg-white dark:bg-black border border-zinc-300 dark:border-zinc-800 p-4 text-zinc-900 dark:text-white outline-none focus:border-orange-600 transition-colors" placeholder="Trvanie" style={{padding: '10px'}} />
            
            <div className="md:col-span-2 flex gap-4">
              <button type="submit" disabled={isSaving} className="flex-grow bg-orange-600 hover:bg-orange-700 text-white font-black py-5 uppercase text-xs tracking-widest shadow-xl transition-all active:scale-95 disabled:opacity-50">
                {editingId !== null ? 'Aktualizovať na webe' : 'Zverejniť na web'}
              </button>
              {editingId !== null && (
                <button type="button" onClick={() => { setEditingId(null); setNewProject({title:'', loc:'', img:'', desc:'', cost:'', duration:'', year:'2024'}); setGalleryText(''); }} className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 uppercase text-[10px] font-bold transition-colors">Zrušiť</button>
              )}
            </div>
          </form>
        </section>

        <section>
          <h2 className="text-zinc-900 dark:text-white font-black uppercase mb-6 flex items-center transition-colors">
            Všetky záznamy <span className="ml-3 bg-zinc-900 dark:bg-zinc-100 text-orange-500 px-3 py-1 text-xs rounded-full border border-zinc-800 dark:border-zinc-300">{projects.length}</span>
          </h2>
          <div className="space-y-4">
            {projects.map(p => (
              <div key={p.id} className="bg-zinc-100 dark:bg-zinc-900/50 p-4 flex items-center justify-between border border-zinc-300 dark:border-zinc-800 hover:border-orange-500 transition-all group rounded-lg">
                <div className="flex items-center gap-6">
                  <img src={p.img} className="w-16 h-16 object-cover rounded border border-zinc-800 dark:border-zinc-300 grayscale group-hover:grayscale-0 transition-all" alt="" loading="lazy" />
                  <div>
                    <h3 className="text-zinc-900 dark:text-white font-bold text-sm uppercase tracking-tight">{p.title}</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-[10px] uppercase font-bold mt-1 tracking-widest">{p.loc} • {p.year}</p>
                    {p.process && <p className="text-zinc-600 dark:text-zinc-400 text-xs mt-1"><b>Proces:</b> {p.process}</p>}
                    {p.scope && <p className="text-zinc-600 dark:text-zinc-400 text-xs mt-1"><b>Rozsah:</b> {p.scope}</p>}
                    {p.materials && <p className="text-zinc-600 dark:text-zinc-400 text-xs mt-1"><b>Materiály/technológie:</b> {p.materials}</p>}
                  </div>
                </div>
                <div className="flex gap-6">
                  <button onClick={() => { setEditingId(p.id); setNewProject(p); setGalleryText(p.gallery?.join('\n') || ''); window.scrollTo({top:0, behavior:'smooth'}); }} className="text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white uppercase text-[9px] font-black tracking-widest transition-colors">Upraviť</button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-900 hover:text-red-500 uppercase text-[9px] font-black tracking-widest transition-colors">Zmazať</button>
                </div>
              </div>
            ))}
            {projects.length === 0 && <p className="text-center py-20 text-zinc-600 dark:text-zinc-400 uppercase text-xs font-black tracking-widest">Databáza je prázdna. Pridajte prvú stavbu vyššie.</p>}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Admin;