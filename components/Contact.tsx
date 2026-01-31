
import React, { useState } from 'react';

interface ContactProps {
  prefilledMessage?: string;
  setPrefilledMessage?: (msg: string) => void;
}

const Contact: React.FC<ContactProps> = ({ prefilledMessage = '', setPrefilledMessage }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: 'Kompletná rekonštrukcia',
    message: prefilledMessage
  });

  // Sync state if prefilledMessage changes externally (from AI Poradca)
  React.useEffect(() => {
    setFormData(prev => ({ ...prev, message: prefilledMessage }));
  }, [prefilledMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulating API call to a backend that would send email to info@targos.sk
    setTimeout(() => {
      console.log("ODOSIELANIE EMAILU NA info@targos.sk", {
        to: "info@targos.sk",
        subject: `Nový dopyt: ${formData.interest} - ${formData.name}`,
        data: formData
      });
      setIsSubmitting(false);
      setSubmitted(true);
      if (setPrefilledMessage) setPrefilledMessage('');
    }, 2000);
  };

  const handlePrintInquiry = () => {
    window.print();
  };

  return (
    <section id="contact" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="animate-in slide-in-from-left duration-1000 print:hidden">
            <h2 className="text-orange-500 font-black uppercase tracking-[0.3em] text-xs mb-4">Kontaktujte nás</h2>
            <h3 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase">MÁTE PLÁN? <br />MY MÁME TÍM.</h3>
            <p className="text-gray-400 text-lg mb-12 font-light leading-relaxed max-w-md">
              Či už ide o drobnú rekonštrukciu alebo výstavbu rodinného domu, sme tu, aby sme vám poskytli odborné poradenstvo a férovú ponuku.
            </p>

            <div className="space-y-10">
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-sm flex items-center justify-center text-orange-500 shrink-0 transform hover:rotate-6 transition-transform">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-black text-sm uppercase tracking-widest mb-1">Telefónny kontakt</h4>
                  <p className="text-orange-500 text-xl font-black tracking-tight">+421 915 234 567</p>
                  <p className="text-zinc-600 text-[10px] mt-1 font-bold uppercase">Po - Pia: 08:00 - 17:00</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-sm flex items-center justify-center text-orange-500 shrink-0 transform hover:-rotate-6 transition-transform">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-black text-sm uppercase tracking-widest mb-1">E-mailová adresa</h4>
                  <p className="text-white text-xl font-bold tracking-tight hover:text-orange-500 transition-colors cursor-pointer">info@targos.sk</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative animate-in slide-in-from-right duration-1000">
            <div className="absolute inset-0 bg-orange-600 blur-[100px] opacity-10 print:hidden"></div>
            
            <div className="relative bg-zinc-900 p-8 md:p-14 rounded-sm border border-zinc-800 shadow-2xl overflow-hidden print:bg-white print:border-black print:p-0 print:shadow-none">
              
              {submitted ? (
                /* --- BEAUTIFUL EMAIL TEMPLATE UI --- */
                <div className="animate-in zoom-in-95 duration-700">
                   <div className="flex items-center justify-between mb-10 border-b border-zinc-800 pb-8 print:border-black">
                      <div className="flex items-center space-x-3">
                         <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center"><span className="text-white font-black text-xs">T</span></div>
                         <span className="text-white font-black uppercase tracking-tighter print:text-black">TARGOŠ STAVEBNÉ PRÁCE</span>
                      </div>
                      <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest print:text-black">Dopyt prijatý</span>
                   </div>

                   <div className="space-y-8">
                      <div className="grid grid-cols-2 gap-8">
                         <div>
                            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-1">Odosielateľ</p>
                            <p className="text-white font-bold print:text-black">{formData.name}</p>
                         </div>
                         <div>
                            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-1">E-mail</p>
                            <p className="text-white font-bold print:text-black">{formData.email}</p>
                         </div>
                      </div>

                      <div>
                         <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-1">Typ projektu</p>
                         <p className="text-orange-500 font-black text-xl tracking-tight uppercase print:text-black">{formData.interest}</p>
                      </div>

                      <div className="bg-black/50 border border-zinc-800 p-6 rounded-sm print:bg-white print:border-black">
                         <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-4">Text správy / Technické detaily</p>
                         <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line print:text-black">
                            {formData.message || "Bez doplňujúcich informácií."}
                         </p>
                      </div>

                      <div className="pt-8 flex flex-col items-center justify-center text-center space-y-6 print:hidden">
                         <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                         </div>
                         <h4 className="text-white font-black text-xl uppercase tracking-tighter">Váš dopyt bol úspešne odoslaný na info@targos.sk</h4>
                         <p className="text-zinc-500 text-xs font-light max-w-xs mx-auto">Náš tím vás bude kontaktovať v priebehu 24 hodín s prvotným vyjadrením a návrhom termínu obhliadky.</p>
                         
                         <div className="flex space-x-4 w-full">
                           <button 
                              onClick={handlePrintInquiry}
                              className="flex-grow bg-zinc-800 hover:bg-zinc-700 text-white font-black py-4 uppercase text-[10px] tracking-widest transition-all"
                           >
                              Vytlačiť potvrdenie
                           </button>
                           <button 
                              onClick={() => setSubmitted(false)}
                              className="flex-grow bg-orange-600 hover:bg-orange-700 text-white font-black py-4 uppercase text-[10px] tracking-widest transition-all"
                           >
                              Nová správa
                           </button>
                         </div>
                      </div>
                   </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 print:hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Vaše meno</label>
                      <input 
                        required 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-black/50 border-b-2 border-zinc-800 focus:border-orange-500 text-white px-0 py-3 outline-none transition-colors" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">E-mail</label>
                      <input 
                        required 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-black/50 border-b-2 border-zinc-800 focus:border-orange-500 text-white px-0 py-3 outline-none transition-colors" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">O čo máte záujem?</label>
                    <select 
                      value={formData.interest}
                      onChange={(e) => setFormData({...formData, interest: e.target.value})}
                      className="w-full bg-black/50 border-b-2 border-zinc-800 focus:border-orange-500 text-white px-0 py-3 outline-none transition-colors appearance-none"
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
                      className="w-full bg-black/50 border-b-2 border-zinc-800 focus:border-orange-500 text-white px-0 py-3 outline-none transition-colors resize-none"
                    ></textarea>
                  </div>
                  <div className="flex items-center space-x-3 mb-8">
                    <input type="checkbox" required className="accent-orange-600 w-4 h-4" />
                    <span className="text-zinc-500 text-xs font-light">Súhlasím so spracovaním <span className="text-orange-500 font-bold cursor-pointer hover:underline">osobných údajov</span>.</span>
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-5 rounded-sm shadow-xl shadow-orange-600/20 transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 flex flex-col items-center justify-center"
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
      </div>
    </section>
  );
};

export default Contact;
