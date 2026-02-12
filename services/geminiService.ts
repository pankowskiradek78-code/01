import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from '../constants';

// --- TYMCZASOWY TEST KLUCZA API ---
// Wklej swój klucz API poniżej, w cudzysłowie, ZAMIAST "TUTAJ_WKLEJ_SWOJ_KLUCZ_API".
// WAŻNE: Po teście usuń swój klucz z tego miejsca!
const API_KEY = "AIzaSyDQWVSb44iOnyw-5JCBhBGPx5AEaNSKzvw"; 
// const API_KEY = process.env.API_KEY; // Ta linia będzie używana po udanym teście.

if (!API_KEY || API_KEY === "TUTAJ_WKLEJ_SWOJ_KLUCZ_API") {
  // Ten błąd będzie widoczny tylko dla dewelopera w konsoli, jeśli klucz API nie zostanie znaleziony.
  console.error("Klucz API nie został wstawiony w pliku services/geminiService.ts. Wklej klucz w odpowiednim miejscu, aby przetestować aplikację.");
  // Zwracamy błąd w interfejsie, aby użytkownik wiedział, co się dzieje.
  // Nie rzucamy błędu, aby aplikacja się nie zawiesiła.
}

// Inicjalizujemy AI tylko jeśli klucz jest dostępny
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export async function sendMessageToGemini(message: string): Promise<string> {
  if (!ai) {
    return "Błąd konfiguracji: Klucz API nie jest dostępny. Skontaktuj się z administratorem.";
  }
  
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
    return "Wystąpił błąd podczas komunikacji z asystentem AI. Sprawdź, czy klucz API jest poprawny i aktywny. Proszę spróbować ponownie później.";
  }
}
