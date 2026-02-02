import { Helmet } from 'react-helmet-async';
import React, { useState } from "react";

const PricingPage: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "Rekonštrukcia domu",
    budget: "",
    details: ""
  });
  const [honeypot, setHoneypot] = useState("");
  const [agree, setAgree] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // antispam
    if (!agree) {
      alert("Pre odoslanie musíte súhlasiť s podmienkami.");
      return;
    }
    const formDataToSend = new FormData();
    formDataToSend.append('name', form.name);
    formDataToSend.append('email', form.email);
    formDataToSend.append('phone', form.phone);
    formDataToSend.append('interest', 'Cenová ponuka: ' + form.projectType);
    formDataToSend.append('budget', form.budget);
    formDataToSend.append('message', form.details);
    formDataToSend.append('website', honeypot);
    files.forEach((file, i) => formDataToSend.append('attachments[]', file));
    try {
      const response = await fetch('https://api.targos.sk/mail.php', {
        method: 'POST',
        body: formDataToSend
      });
      if (!response.ok) throw new Error('Chyba pri odosielaní formulára.');
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      alert((err as any).message || 'Chyba pri odosielaní.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Cenník | TARGOŠ</title>
        <meta name="description" content="Cenník stavebných prác a služieb TARGOŠ. Férové ceny, transparentné podmienky, profesionálny prístup." />
        <meta property="og:title" content="Cenník | TARGOŠ" />
        <meta property="og:description" content="Cenník stavebných prác a služieb TARGOŠ. Férové ceny, transparentné podmienky, profesionálny prístup." />
        <meta property="og:image" content="/images/og_pricing.jpg" />
      </Helmet>
      <section className="min-h-[80vh] bg-black py-20 pt-60 flex items-center justify-center">
        <div className="max-w-2xl w-full rounded-2xl bg-black border border-zinc-800 px-6 py-10 md:px-12 md:py-14 relative shadow-[0_4px_32px_0_rgba(234,88,12,0.10)] mx-4">
          {!submitted && (
            <>
              <h1 className="text-4xl md:text-5xl font-black text-orange-500 mb-6 text-center">Žiadosť o cenovú ponuku</h1>
              <p className="text-zinc-300 text-lg mb-10 text-center">Vyplňte krátky formulár a pripravíme vám individuálnu cenovú ponuku na mieru. Čím viac detailov uvediete, tým presnejšie vám vieme pomôcť.</p>
            </>
          )}
          {submitted ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h2 className="text-2xl font-black text-orange-500 mb-2">Ďakujeme za váš záujem!</h2>
              <p className="text-zinc-300">Vaša žiadosť bola úspešne odoslaná. Ozveme sa vám do 24 hodín s ponukou na mieru.</p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-10 bg-orange-600 hover:bg-orange-700 text-white font-black py-4 px-8 rounded text-lg uppercase tracking-widest transition-all"
              >
                Nová žiadosť
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 print:hidden">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Meno a priezvisko *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-black border-b-2 border-zinc-700 focus:border-orange-500 text-white px-3 py-3 outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">E-mail *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-black border-b-2 border-zinc-700 focus:border-orange-500 text-white px-3 py-3 outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Telefón</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full bg-black border-b-2 border-zinc-700 focus:border-orange-500 text-white px-3 py-3 outline-none transition-colors"
                    placeholder="+421 908 949 117"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Typ projektu</label>
                  <select
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                    className="w-full bg-black border-b-2 border-zinc-700 focus:border-orange-500 text-white px-3 py-3 outline-none transition-colors appearance-none"
                  >
                    <option>Rekonštrukcia domu</option>
                    <option>Novostavba</option>
                    <option>Bytové úpravy</option>
                    <option>Iné</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Rozpočet (voliteľné)</label>
                  <input
                    type="text"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    className="w-full bg-black border-b-2 border-zinc-700 focus:border-orange-500 text-white px-3 py-3 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">Prílohy (voliteľné, PDF/JPG/PNG, max 5MB/súbor)</label>
                  <div className="relative w-full">
                    <input
                      type="file"
                      name="attachments"
                      accept=".pdf,.jpg,.jpeg,.png"
                      multiple
                      onChange={e => setFiles(Array.from(e.target.files || []))}
                      className="w-full bg-zinc-900 border-2 border-zinc-800 rounded-lg px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-600 file:text-white file:font-black file:uppercase file:tracking-widest transition-all hover:border-orange-500 focus:border-orange-500 cursor-pointer"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-orange-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828L18 9.828V7h-2.828z" /></svg>
                    </span>
                    {files.length > 0 && (
                      <ul className="mt-2 text-xs text-zinc-400 list-disc list-inside">
                        {files.map((file, i) => (
                          <li key={i}>{file.name}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Detailný popis zámeru *</label>
                <textarea
                  name="details"
                  value={form.details}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-black border-b-2 border-zinc-700 focus:border-orange-500 text-white px-3 py-3 outline-none transition-colors resize-none"
                  placeholder="Popíšte čo najviac detailov, napr. lokalitu, rozsah prác, termín, špecifiká..."
                />
              </div>
              <div className="flex items-center space-x-3 mb-8">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agree}
                  onChange={e => setAgree(e.target.checked)}
                  className="accent-orange-600 w-4 h-4"
                  required
                />
                <label htmlFor="agree" className="text-zinc-400 text-xs">Súhlasím so spracovaním osobných údajov podľa <a href="/gdpr" className="underline text-orange-500" target="_blank" rel="noopener noreferrer">zásad ochrany osobných údajov</a>.</label>
              </div>
              {/* Honeypot */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={e => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />
              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-5 rounded-lg shadow-xl shadow-orange-600/20 transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 flex flex-col items-center justify-center"
              >
                ODOSLAŤ ŽIADOSŤ
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default PricingPage;
