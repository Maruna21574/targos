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
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Tu by sa posielali dáta na backend
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
        <div className="max-w-2xl w-full bg-zinc-900 rounded-xl shadow-2xl p-8 md:p-14 mx-4">
          <h1 className="text-4xl md:text-5xl font-black text-orange-500 mb-6 text-center">Žiadosť o cenovú ponuku</h1>
          <p className="text-zinc-300 text-lg mb-10 text-center">Vyplňte krátky formulár a pripravíme vám individuálnu cenovú ponuku na mieru. Čím viac detailov uvediete, tým presnejšie vám vieme pomôcť.</p>
          {submitted ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h2 className="text-2xl font-black text-orange-500 mb-2">Ďakujeme za váš záujem!</h2>
              <p className="text-zinc-300">Vaša žiadosť bola úspešne odoslaná. Ozveme sa vám do 24 hodín s ponukou na mieru.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">Meno a priezvisko</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full rounded bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">E-mail</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full rounded bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">Telefón</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} required className="w-full rounded bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">Typ projektu</label>
                <select name="projectType" value={form.projectType} onChange={handleChange} className="w-full rounded bg-zinc-800 text-white px-4 py-3">
                  <option>Rekonštrukcia domu</option>
                  <option>Novostavba</option>
                  <option>Kompletná modernizácia bytu</option>
                  <option>Komerčný priestor</option>
                  <option>Iné</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">Odhadovaný rozpočet (voliteľné)</label>
                <input type="text" name="budget" value={form.budget} onChange={handleChange} placeholder="Napr. 50 000 €" className="w-full rounded bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">Popis projektu / špecifikácia</label>
                <textarea name="details" value={form.details} onChange={handleChange} required rows={5} className="w-full rounded bg-zinc-800 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Opíšte stručne váš zámer, lokalitu, termín, špecifiká..." />
              </div>
              <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-4 rounded text-lg uppercase tracking-widest transition-all">Odoslať žiadosť</button>
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default PricingPage;
