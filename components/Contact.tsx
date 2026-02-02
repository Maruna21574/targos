import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface ContactProps {
  prefilledMessage?: string;
  setPrefilledMessage?: (msg: string) => void;
  isHome?: boolean;
}

const Contact: React.FC<ContactProps> = ({ prefilledMessage = '', setPrefilledMessage, isHome }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Kompletná rekonštrukcia',
    message: prefilledMessage
  });

  React.useEffect(() => {
    setFormData(prev => ({ ...prev, message: prefilledMessage }));
  }, [prefilledMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('https://www.targos.sk/mail.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error('Chyba pri odosielaní dopytu.');
      setIsSubmitting(false);
      setSubmitted(true);
      if (setPrefilledMessage) setPrefilledMessage('');
    } catch (err) {
      setIsSubmitting(false);
      alert((err as any).message || 'Chyba pri odosielaní.');
    }
  };

  const handlePrintInquiry = () => {
    window.print();
  };

  return (
    <>
      <Helmet>
        <title>Kontakt | TARGOŠ</title>
        <meta name="description" content="Kontaktujte nás pre nezáväznú cenovú ponuku alebo odborné poradenstvo. TARGOŠ - stavebné práce s tradíciou." />
        <meta property="og:title" content="Kontakt | TARGOŠ" />
        <meta property="og:description" content="Kontaktujte nás pre nezáväznú cenovú ponuku alebo odborné poradenstvo. TARGOŠ - stavebné práce s tradíciou." />
        <meta property="og:image" content="/images/og_contact.jpg" />
      </Helmet>
    <section className={`${isHome ? 'py-0 mb-32' : 'py-20'} min-h-[60vh] bg-transparent`}>
      <div className="max-w-7xl pt-20 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-12 items-stretch">
        {/* LEFT PANEL: Contact Info */}
        <div className="md:w-1/2 flex flex-col justify-center mb-12 md:mb-0">
          <h5 className="text-orange-500 font-black uppercase tracking-widest text-xs mb-4">Kontaktujte nás</h5>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">MÁTE PLÁN?<br/>MY MÁME TÍM.</h2>
          <p className="text-zinc-300 text-lg mb-10 max-w-lg">Či už ide o drobnú rekonštrukciu alebo výstavbu rodinného domu, sme tu, aby sme vám poskytli odborné poradenstvo a férovú ponuku.</p>
          <div className="space-y-10">
            <div className="flex items-center gap-4">
              <div className="bg-zinc-900 p-3 flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5.75C3 4.784 3.784 4 4.75 4h14.5A1.75 1.75 0 0121 5.75v12.5A1.75 1.75 0 0119.25 20H4.75A1.75 1.75 0 013 18.25V5.75z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l9 6 9-6" /></svg>
              </div>
              <div>
                <div className="text-zinc-400 text-xs font-black uppercase tracking-widest">Telefónny kontakt</div>
                <a href="tel:+421908949117" className="text-orange-500 font-black text-lg md:text-xl hover:underline tracking-wider">+421&nbsp;908&nbsp;949&nbsp;117</a>
                <div className="text-zinc-500 text-xs">Po - Pia: 08:00 - 17:00</div>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div className="bg-zinc-900 p-3 flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 01-8 0m8 0a4 4 0 00-8 0m8 0V8a4 4 0 00-8 0v4m8 0v4a4 4 0 01-8 0v-4" /></svg>
              </div>
              <div>
                <div className="text-zinc-400 text-xs font-black uppercase tracking-widest">E-mailová adresa</div>
                <a href="mailto:info@targos.sk" className="text-white font-black text-lg md:text-xl hover:underline">info@targos.sk</a>
              </div>
            </div>
          </div>
        </div>
        {/* RIGHT PANEL: Form */}
        <div className="md:w-1/2 flex items-center">
          <div className={`w-full rounded-2xl bg-black border border-zinc-800 px-6 py-10 md:px-12 md:py-14 relative ${isHome ? 'shadow-[0_0_40px_0_rgba(234,88,12,0.4)]' : 'shadow-2xl'}`}>
            {submitted ? (
              <div>
                <div>
                  <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-1">Typ projektu</p>
                  <p className="text-orange-500 font-black text-xl tracking-tight uppercase print:text-black">{formData.interest}</p>
                </div>
                <div className="bg-zinc-100 border border-zinc-200 p-6 rounded-lg print:bg-white print:border-black">
                  <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-4">Text správy / Technické detaily</p>
                  <p className="text-zinc-700 text-sm leading-relaxed whitespace-pre-line print:text-black">
                    {formData.message || "Bez doplňujúcich informácií."}
                  </p>
                </div>
                <div className="pt-8 flex flex-col items-center justify-center text-center space-y-6 print:hidden">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                    <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h4 className="text-zinc-900 font-black text-xl uppercase tracking-tighter">Váš dopyt bol úspešne odoslaný na info@targos.sk</h4>
                  <p className="text-zinc-500 text-xs font-light max-w-xs mx-auto">Náš tím vás bude kontaktovať v priebehu 24 hodín s prvotným vyjadrením a návrhom termínu obhliadky.</p>
                  <div className="flex space-x-4 w-full">
                    <button 
                      onClick={handlePrintInquiry}
                      className="flex-grow bg-zinc-200 hover:bg-zinc-300 text-zinc-900 font-black py-4 uppercase text-[10px] tracking-widest transition-all rounded-lg"
                    >
                      Vytlačiť potvrdenie
                    </button>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="flex-grow bg-orange-600 hover:bg-orange-700 text-white font-black py-4 uppercase text-[10px] tracking-widest transition-all rounded-lg"
                    >
                      Nová správa
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 print:hidden">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Vaše meno</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-black border-b-2 border-zinc-700 focus:border-orange-500 text-white px-3 py-3 outline-none transition-colors" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">E-mail</label>
                    <input 
                      required 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-black border-b-2 border-zinc-700 focus:border-orange-500 text-white px-3 py-3 outline-none transition-colors" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Telefón</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-black border-b-2 border-zinc-700 focus:border-orange-500 text-white px-3 py-3 outline-none transition-colors" 
                      placeholder="+421 908 949 117"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">O čo máte záujem?</label>
                  <select 
                    value={formData.interest}
                    onChange={(e) => setFormData({...formData, interest: e.target.value})}
                    className="w-full bg-black border-b-2 border-zinc-700 focus:border-orange-500 text-white px-3 py-3 outline-none transition-colors appearance-none"
                  >
                    <option>Kompletná rekonštrukcia</option>
                    <option>Novostavba rodinného domu</option>
                    <option>Elektroinštalácie & Revízie</option>
                    <option>Iné stavebné práce</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Detaily projektu</label>
                  <textarea 
                    rows={4} 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Popíšte nám vašu predstavu..."
                    className="w-full bg-black border-b-2 border-zinc-700 focus:border-orange-500 text-white px-3 py-3 outline-none transition-colors resize-none"
                  ></textarea>
                </div>
                <div className="flex items-center space-x-3 mb-8">
                  <input type="checkbox" required className="accent-orange-600 w-4 h-4" />
                  <span className="text-zinc-500 text-xs font-light">Súhlasím so spracovaním <Link to="/gdpr" className="text-orange-500 font-bold cursor-pointer hover:underline">osobných údajov</Link>.</span>
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-5 rounded-lg shadow-xl shadow-orange-600/20 transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 flex flex-col items-center justify-center"
                >
                  {isSubmitting ? (
                    <div className="flex flex-col items-center">
                      <svg className="animate-spin h-5 w-5 text-white mb-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="uppercase text-[9px] tracking-widest opacity-50">Spracovávam dopyt na info@targos.sk</span>
                    </div>
                  ) : (
                    <span className="uppercase text-xs tracking-[0.2em]">Odoslať nezáväzný dopyt</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      {isHome && (
        <div className="block md:hidden mb-32" />
      )}
      {/* Orange shadow below removed for a subtler look as requested */}
    </section>
    </>
  );
};

export default Contact;
