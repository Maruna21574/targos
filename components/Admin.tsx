
import React, { useState, useEffect } from 'react';
import { saveProject, deleteProject, getProjects, uploadImage } from '../services/supabaseService';
// ...existing code...

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
  defaultProjects: Project[];
}

const Admin: React.FC<AdminProps> = ({ projects, setProjects }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ user: '', pass: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '', loc: '', img: '', desc: '', cost: '', duration: '', year: new Date().getFullYear().toString(), 
    gallery: [], scope: '', process: ''
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
  defaultProjects: Project[];
}

const Admin: React.FC<AdminProps> = ({ projects, setProjects }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ user: '', pass: '' });
  const [isSaving, setIsSaving] = useState(false);
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
      <div className="min-h-screen bg-black flex items-center justify-center p-4 text-left">
        <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 p-10 rounded-sm text-center">
          <h1 className="text-2xl font-black text-white uppercase mb-8">Administrácia Targos</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="text" placeholder="Meno" className="w-full bg-black border border-zinc-800 p-4 text-white outline-none focus:border-orange-600" value={loginForm.user} onChange={e => setLoginForm({...loginForm, user: e.target.value})} />
            <input type="password" placeholder="Heslo" className="w-full bg-black border border-zinc-800 p-4 text-white outline-none focus:border-orange-600" value={loginForm.pass} onChange={e => setLoginForm({...loginForm, pass: e.target.value})} />
            <button type="submit" className="w-full bg-orange-600 text-white font-black py-4 uppercase text-xs tracking-widest shadow-xl">Vstúpiť</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 pt-32 pb-20 px-4 text-left">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex justify-between items-end mb-12 border-b border-zinc-800 pb-8">
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Databáza realizácií</h1>
            <div className="flex items-center space-x-2 mt-2">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
               <p className="text-green-500 text-[10px] font-black uppercase tracking-widest">Prepojené s ostrou databázou</p>
            </div>
          </div>
          <button onClick={handleLogout} className="text-zinc-600 hover:text-white uppercase text-[10px] font-bold">Odhlásiť</button>
        </div>

        <section className="bg-zinc-900 p-8 border border-zinc-800 mb-12 shadow-2xl relative overflow-hidden">
          {isSaving && <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-20 flex items-center justify-center text-white font-black uppercase text-xs tracking-[0.3em]">Ukladám do databázy...</div>}
          
          <h2 className="text-white font-black uppercase mb-8 border-l-4 border-orange-600 pl-4">
            {editingId !== null ? 'Upraviť záznam' : 'Nová realizácia'}
          </h2>
          
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input required value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className="bg-black border border-zinc-800 p-4 text-white outline-none focus:border-orange-600" placeholder="Názov projektu" />
            <div className="grid grid-cols-2 gap-4">
              <input required value={newProject.loc} onChange={e => setNewProject({...newProject, loc: e.target.value})} className="bg-black border border-zinc-800 p-4 text-white outline-none focus:border-orange-600" placeholder="Lokalita" />
              <input required value={newProject.year} onChange={e => setNewProject({...newProject, year: e.target.value})} className="bg-black border border-zinc-800 p-4 text-white outline-none focus:border-orange-600" placeholder="Rok" />
            </div>
            <div className="md:col-span-2 flex gap-4 items-center">
              <input required value={newProject.img} onChange={e => setNewProject({...newProject, img: e.target.value})} className="flex-grow bg-black border border-zinc-800 p-4 text-white outline-none focus:border-orange-600" placeholder="Hlavná fotka (URL)" />
              <div
                onDrop={handleImgUpload}
                onDragOver={e => e.preventDefault()}
                className="flex items-center justify-center w-20 h-20 border-2 border-dashed border-orange-600 rounded cursor-pointer bg-black/30 hover:bg-black/50 transition"
                title="Pretiahni obrázok alebo klikni"
              >
                <input type="file" accept="image/*" onChange={handleImgUpload} className="absolute opacity-0 w-20 h-20 cursor-pointer" style={{left:0,top:0}} title="Nahrať obrázok" />
                <span className="text-xs text-orange-400">Drop/Click</span>
              </div>
              {newProject.img && (
                <img src={newProject.img} alt="Náhľad" className="w-16 h-16 object-cover rounded border border-zinc-800 ml-2" />
              )}
            </div>
            <div className="md:col-span-2 flex gap-4 items-start">
              <div className="flex-grow">
                <textarea value={galleryText} onChange={e => setGalleryText(e.target.value)} className="w-full bg-black border border-zinc-800 p-4 text-white font-mono text-xs outline-none focus:border-orange-600" rows={3} placeholder="Ďalšie fotky (URL, jedna na riadok)" />
                {/* Náhľady galérie */}
                <div
                  onDrop={handleGalleryUpload}
                  onDragOver={e => e.preventDefault()}
                  className="flex flex-wrap gap-2 mt-2 min-h-[40px] border-2 border-dashed border-orange-600 rounded p-1 bg-black/30 hover:bg-black/50 transition"
                  title="Pretiahni obrázky sem"
                >
                  {galleryText.split('\n').filter(Boolean).map((url, i, arr) => (
                    <div key={i} className="relative group flex flex-col items-center">
                      <img src={url} alt="Galéria" className="w-16 h-16 object-cover rounded border border-zinc-800" />
                      <div className="flex gap-1 mt-1">
                        <button type="button" onClick={() => handleMoveGalleryImg(i, -1)} disabled={i === 0} className="bg-zinc-800 text-white text-xs rounded px-1 disabled:opacity-30">←</button>
                        <button type="button" onClick={() => handleMoveGalleryImg(i, 1)} disabled={i === arr.length - 1} className="bg-zinc-800 text-white text-xs rounded px-1 disabled:opacity-30">→</button>
                        <button type="button" onClick={() => handleRemoveGalleryImg(url)} className="bg-black/70 text-white text-xs rounded-full px-1 opacity-80 hover:bg-red-600">×</button>
                      </div>
                    </div>
                  ))}
                  <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="absolute opacity-0 w-1 h-1" style={{left:0,top:0}} title="Nahrať viac obrázkov" />
                </div>
              </div>
            </div>
            <textarea required value={newProject.desc} onChange={e => setNewProject({...newProject, desc: e.target.value})} className="md:col-span-2 bg-black border border-zinc-800 p-4 text-white outline-none focus:border-orange-600" rows={2} placeholder="Stručný popis" />
            <input value={newProject.cost} onChange={e => setNewProject({...newProject, cost: e.target.value})} className="bg-black border border-zinc-800 p-4 text-white outline-none focus:border-orange-600" placeholder="Cena" />
            <input value={newProject.duration} onChange={e => setNewProject({...newProject, duration: e.target.value})} className="bg-black border border-zinc-800 p-4 text-white outline-none focus:border-orange-600" placeholder="Trvanie" />
            
            <div className="md:col-span-2 flex gap-4">
              <button type="submit" disabled={isSaving} className="flex-grow bg-orange-600 text-white font-black py-5 uppercase text-xs tracking-widest shadow-xl transition-all active:scale-95 disabled:opacity-50">
                {editingId !== null ? 'Aktualizovať na webe' : 'Zverejniť na web'}
              </button>
              {editingId !== null && (
                <button type="button" onClick={() => { setEditingId(null); setNewProject({title:'', loc:'', img:'', desc:'', cost:'', duration:'', year:'2024'}); setGalleryText(''); }} className="bg-zinc-800 text-white px-8 uppercase text-[10px] font-bold">Zrušiť</button>
              )}
            </div>
          </form>
        </section>

        <section>
          <h2 className="text-white font-black uppercase mb-6 flex items-center">
            Všetky záznamy <span className="ml-3 bg-zinc-900 text-orange-500 px-3 py-1 text-xs rounded-full border border-zinc-800">{projects.length}</span>
          </h2>
          <div className="space-y-4">
            {projects.map(p => (
              <div key={p.id} className="bg-zinc-900/50 p-4 flex items-center justify-between border border-zinc-800 hover:border-zinc-700 transition-all group">
                <div className="flex items-center gap-6">
                  <img src={p.img} className="w-16 h-16 object-cover rounded-sm border border-zinc-800 grayscale group-hover:grayscale-0 transition-all" alt="" />
                  <div>
                    <h3 className="text-white font-bold text-sm uppercase tracking-tight">{p.title}</h3>
                    <p className="text-zinc-500 text-[10px] uppercase font-bold mt-1 tracking-widest">{p.loc} • {p.year}</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <button onClick={() => { setEditingId(p.id); setNewProject(p); setGalleryText(p.gallery?.join('\n') || ''); window.scrollTo({top:0, behavior:'smooth'}); }} className="text-zinc-500 hover:text-white uppercase text-[9px] font-black tracking-widest">Upraviť</button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-900 hover:text-red-500 uppercase text-[9px] font-black tracking-widest">Zmazať</button>
                </div>
              </div>
            ))}
            {projects.length === 0 && <p className="text-center py-20 text-zinc-600 uppercase text-xs font-black tracking-widest">Databáza je prázdna. Pridajte prvú stavbu vyššie.</p>}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Admin;
