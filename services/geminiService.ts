
import { GoogleGenAI } from "@google/genai";

export const getAIPonsultation = async (projectDescription: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Si hlavný projektový inžinier stavebnej firmy TARGOŠ. 
      Vypracuj technickú analýzu pre dopyt: "${projectDescription}".
      
      ODPOVEĎ MUSÍ BYŤ FORMÁTOVANÁ PRESNE TAKTO:
      
      # NÁROČNOSŤ: [Sem napíš len jedno slovo: NÍZKA alebo STREDNÁ alebo VYSOKÁ]
      # ANALÝZA: [Sem napíš technické zhodnotenie]
      # RIZIKÁ: [Sem napíš kritické body]
      # POSTUP: [Sem napíš kroky realizácie]
      # MATERIÁLY: [Sem napíš odporúčané materiály]
      # ODHAD: [Sem napíš čas a peniaze]
      
      Tón: Expertný, stručný.`,
      config: {
        temperature: 0.2,
      },
    });

    return response.text;
  } catch (error) {
    console.error("AI Consultation error:", error);
    return "# NÁROČNOSŤ: N/A\n# ANALÝZA: Chyba spojenia.";
  }
};
