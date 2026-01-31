
import { GoogleGenAI, Type } from "@google/genai";

export const getAIPonsultation = async (projectDescription: string) => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === 'undefined' || apiKey === '') {
    throw new Error("API_KEY_MISSING");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Vypracuj analýzu pre tento dopyt: "${projectDescription}"`,
      config: {
        systemInstruction: "Si hlavný projektový inžinier stavebnej firmy TARGOŠ. Tvojou úlohou je poskytovať technické konzultácie. Odpovedaj výhradne v slovenskom jazyku a v štruktúrovanom JSON formáte.",
        temperature: 0.1,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            narocnost: { type: Type.STRING, description: "NÍZKA, STREDNÁ alebo VYSOKÁ" },
            analyza: { type: Type.STRING, description: "Technické zhodnotenie projektu" },
            rizika: { type: Type.STRING, description: "Kritické body realizácie" },
            postup: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Kroky realizácie" },
            materialy: { type: Type.STRING, description: "Odporúčané materiály" },
            odhad: { type: Type.STRING, description: "Časový a finančný rámec" }
          },
          required: ["narocnost", "analyza", "rizika", "postup", "materialy", "odhad"]
        }
      },
    });

    if (!response || !response.text) {
      throw new Error("EMPTY_RESPONSE");
    }

    return response.text;
  } catch (error) {
    console.error("AI Consultation error:", error);
    throw error;
  }
};
