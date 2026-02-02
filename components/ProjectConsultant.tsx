
import React, { useState } from 'react';
import { getAIPonsultation } from '../services/geminiService';
import { useNavigate } from 'react-router-dom';

interface ProjectConsultantProps {
  setActivePage?: (page: string) => void;
  setPrefilledMessage?: (msg: string) => void;
  isHome?: boolean;
}

const ProjectConsultant: React.FC<ProjectConsultantProps> = ({ setActivePage, setPrefilledMessage, isHome }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const adviceJson = await getAIPonsultation(query);
      if (adviceJson) {
        const parsed = JSON.parse(adviceJson);
        setResult(parsed);
      }
    } catch (err: any) {
      console.error(err);
      if (err.message === "GEMINI_API_KEY_MISSING") {
        setError("Chyba konfigurácie: API kľúč nie je nastavený. Prosím, nastavte environmentálnu premennú GEMINI_API_KEY.");
      } else {
        setError("Momentálne sa nepodarilo spojiť s AI poradcom. Skontrolujte prosím pripojenie alebo skúste neskôr.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuoteClick = () => {
    if (setPrefilledMessage && result) {
      setPrefilledMessage(`Dopyt: ${query}\n\nAI analýza TARGOŠ:\nNáročnosť: ${result.narocnost}\nOdhad: ${result.odhad}`);
    }
    // Ak je dostupný setActivePage, použi ho (homepage), inak presmeruj na /kontakt (podstránka /ai)
    if (setActivePage) {
      setActivePage('contact');
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate('/kontakt');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getDifficultyColor = (diff: string = '') => {
    const d = diff.toUpperCase();
    if (d.includes('VYSOKÁ')) return 'text-red-500';
    if (d.includes('STREDNÁ')) return 'text-orange-500';
    return 'text-green-500';
  };

  // Detect if on /kontakt page
  const location = window.location?.pathname || '';
  const isContactPage = location === '/kontakt';

  // On homepage, force py-0, otherwise keep original logic

  // Always add pb-24
  let sectionPadding = 'py-24 pb-24';
  if (isHome) sectionPadding = 'py-0 pb-24';
  else if (isContactPage) sectionPadding = 'py-0 md:py-24 pb-24';

  return (
    <section id="ai-poradca" className={`${sectionPadding} bg-zinc-950 relative overflow-hidden print:bg-white print:p-0`}>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/5 blur-[150px] -z-10 rounded-full print:hidden"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="print-header hidden">
          <div className="flex justify-between items-end border-b-2 border-black pb-6 mb-8 text-left">
            <div>
              <h1 className="text-3xl font-black text-black">TARGOŠ STAVEBNÉ PRÁCE</h1>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Profesionálna technická analýza projektu</p>
            </div>
            <div className="text-right text-[10px] font-bold text-gray-400">
              VYGENEROVANÉ: {new Date().toLocaleDateString('sk-SK')}
            </div>
          </div>
        </div>

        <div className="text-center pt-32 mb-16 print:hidden">
          <div className="inline-block px-4 mb-10 py-1 rounded-full bg-orange-600/10 text-orange-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4 border border-orange-500/20">
            Targoš AI Projektový Poradca
          </div>
          <h2 className="text-5xl pt-10 md:text-7xl font-black text-white mb-6 tracking-tighter uppercase leading-none">
            PROJEKTOVÝ <span className="text-orange-600">PORADCA</span>
          </h2>
          <p className="text-zinc-500 text-sm font-light max-w-xl mx-auto">
            Náš inteligentný systém vyhodnotí váš stavebný zámer a pripraví vám kompletný technický pas.
          </p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-sm p-8 md:p-12 shadow-2xl relative backdrop-blur-sm print:bg-white print:border-none print:shadow-none print:p-0">
          <form onSubmit={handleSubmit} className="mb-10 print:hidden">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Popíšte váš zámer (napr. rekonštrukcia kúpeľne, novostavba...)"
                className="flex-grow bg-black border border-zinc-800 text-white rounded-sm px-6 py-5 focus:outline-none focus:border-orange-600 transition-all text-lg font-light placeholder:text-xs md:placeholder:text-base overflow-x-auto whitespace-nowrap"
                style={{ WebkitOverflowScrolling: 'touch' }}
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-orange-600 hover:bg-orange-700 disabled:bg-zinc-800 text-white px-12 py-5 rounded-sm font-black transition-all flex items-center justify-center space-x-3 uppercase text-xs tracking-widest"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Generujem...</span>
                  </div>
                ) : "Analyzovať"}
              </button>
            </div>
            {error && <p className="text-red-500 text-xs mt-4 text-left font-bold uppercase tracking-widest">{error}</p>}
          </form>

          {result && (
            <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000 text-left">
              {/* PRINT-ONLY WRAPPER: len výsledok analýzy */}
              <div className="print:block hidden" id="ai-print-result">
                <h3 className="text-black font-black text-2xl uppercase tracking-tighter mb-6">AI Analýza projektu</h3>
                <div className="mb-4">
                  <strong>Zadanie:</strong> {query}
                </div>
                <div className="mb-4">
                  <strong>Kategória:</strong> {result.narocnost}
                </div>
                <div className="mb-4">
                  <strong>Technické zhodnotenie:</strong>
                  <div>{result.analyza}</div>
                </div>
                <div className="mb-4">
                  <strong>Harmonogram prác:</strong>
                  <ul>
                    {result.postup.map((step: string, i: number) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <strong>Materiály:</strong> {result.materialy}
                </div>
                <div className="mb-4">
                  <strong>Odhad:</strong> {result.odhad}
                </div>
                <div className="mb-4">
                  <strong>Riziká:</strong> {result.rizika}
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 border-b border-zinc-800 pb-10 print:border-black">
                <div className="max-w-xl">
                   <h3 className="text-white font-black text-2xl uppercase tracking-tighter print:text-black">Zadanie: {query}</h3>
                   <div className="flex items-center space-x-4 mt-4">
                      <div className="flex space-x-1">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className={`w-2 h-6 rounded-full ${
                            (result.narocnost.includes('NÍZKA') && i === 1) ||
                            (result.narocnost.includes('STREDNÁ') && i <= 2) ||
                            (result.narocnost.includes('VYSOKÁ') && i <= 3)
                            ? 'bg-orange-600' : 'bg-zinc-800 print:bg-gray-200'
                          }`}></div>
                        ))}
                      </div>
                      <span className={`text-xs font-black uppercase tracking-widest ${getDifficultyColor(result.narocnost)}`}>
                        KATEGÓRIA: {result.narocnost}
                      </span>
                   </div>
                </div>
                <button 
                  onClick={handlePrint} 
                  className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-4 rounded-sm transition-all print:hidden flex items-center space-x-3 border border-zinc-700"
                >
                  <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  <span className="text-[10px] font-black uppercase tracking-widest">Uložiť ako PDF</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                  <div className="bg-black/30 border border-zinc-800 p-8 rounded-sm print:border-black print:p-4">
                    <h4 className="text-white font-black text-xs uppercase tracking-widest mb-4 print:text-black">Technické zhodnotenie</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed print:text-black">{result.analyza}</p>
                  </div>

                  <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-sm print:border-black print:p-4">
                    <h4 className="text-white font-black text-xs uppercase tracking-widest mb-6 print:text-black">Harmonogram prác</h4>
                    <div className="space-y-4">
                      {result.postup.map((step: string, i: number) => (
                        <div key={i} className="flex items-start space-x-4">
                          <span className="text-orange-500 font-black text-xs mt-1">{i + 1}.</span>
                          <p className="text-zinc-400 text-sm print:text-black">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-sm print:border-black print:p-4">
                    <h4 className="text-white font-black text-xs uppercase tracking-widest mb-4 print:text-black">Materiály</h4>
                    <p className="text-zinc-500 text-xs leading-relaxed print:text-black">{result.materialy}</p>
                  </div>

                  <div className="bg-orange-600 p-8 rounded-sm print:bg-white print:border-2 print:border-orange-600">
                    <h4 className="text-white font-black text-xs uppercase tracking-widest mb-4 print:text-orange-600">Orientačný odhad</h4>
                    <p className="text-white text-2xl font-black print:text-black">{result.odhad}</p>
                  </div>

                  <div className="bg-red-950/20 border border-red-900/50 p-6 rounded-sm print:bg-white print:border-black">
                    <h4 className="text-red-500 font-black text-[10px] uppercase tracking-widest mb-2">Riziká</h4>
                    <p className="text-zinc-500 text-[10px] leading-tight print:text-black">{result.rizika}</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-10 border-t border-zinc-800 flex justify-end print:hidden">
                <button 
                  onClick={handleQuoteClick}
                  className="bg-white text-black hover:bg-orange-600 hover:text-white px-12 py-5 font-black uppercase text-xs tracking-widest transition-all"
                >
                  Poslať dopyt s touto analýzou &rarr;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectConsultant;
