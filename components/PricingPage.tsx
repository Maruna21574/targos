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
        <div className="max-w-2xl w-full bg-zinc-900 rounded-xl shadow-2xl p-8 md:p-14 mx-4">
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
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* ...existing code... */}
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default PricingPage;
