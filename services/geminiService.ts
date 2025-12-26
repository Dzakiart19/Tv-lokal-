
import { GoogleGenAI, Type } from "@google/genai";
import { CHANNELS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export async function getAIRecommendations() {
  const channelNames = CHANNELS.map(c => c.name).join(", ");
  const prompt = `Berdasarkan program umum dari saluran TV Indonesia berikut: ${channelNames}, 
  berikan ringkasan satu kalimat yang menarik untuk masing-masing saluran tentang apa yang paling mereka kenal saat ini. 
  Gunakan Bahasa Indonesia. Kembalikan hasilnya sebagai array objek JSON dengan kolom 'channelId' dan 'insight'. Gunakan ID saluran: ${CHANNELS.map(c => c.id).join(", ")}.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              channelId: { type: Type.STRING },
              insight: { type: Type.STRING }
            },
            required: ["channelId", "insight"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
}

export async function getProgramVibe(channelName: string) {
  const prompt = `Berikan deskripsi kreatif 2 kalimat tentang "nuansa" dan penonton tipikal untuk saluran TV Indonesia ${channelName}. Gunakan Bahasa Indonesia yang elegan dan premium.`;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt
    });
    return response.text;
  } catch (error) {
    return "Nikmati hiburan dan berita Indonesia kelas atas dalam kualitas jernih.";
  }
}