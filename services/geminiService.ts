import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from '../constants';

// Klucz API zostanie automatycznie dostarczony przez środowisko uruchomieniowe.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // Ten błąd będzie widoczny tylko dla dewelopera w konsoli, jeśli klucz API nie zostanie znaleziony.
  throw new Error("API_KEY is not defined. Please check your environment configuration.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function sendMessageToGemini(message: string): Promise<string> {
  try {
    // Używamy modelu odpowiedniego do zadań tekstowych i konwersacji
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: message,
      config: {
        // Przekazujemy instrukcję systemową, aby nadać chatbotowi odpowiednią osobowość i wiedzę
        systemInstruction: SYSTEM_PROMPT,
      }
    });
    
    const text = response.text;

    if (!text) {
      return "Przepraszam, otrzymałem pustą odpowiedź. Spróbuj ponownie.";
    }
    return text;

  } catch (error) {
    console.error("Gemini API communication error:", error);
    return "Wystąpił błąd podczas komunikacji z asystentem AI. Proszę spróbować ponownie później.";
  }
}
