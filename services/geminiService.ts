import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from '../constants';

// Poprawny sposób odczytu klucza API w aplikacji Vite.
// Vite wstrzyknie tutaj wartość z pliku .env podczas budowania.
const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_KEY) {
  // Ten błąd będzie widoczny w konsoli przeglądarki, jeśli klucz nie zostanie znaleziony.
  console.error("VITE_API_KEY is not defined. Please check your .env file.");
  // Zwracamy błąd w interfejsie, aby użytkownik wiedział, co się dzieje.
  // Nie rzucamy błędu `throw new Error`, aby aplikacja się nie zawiesiła całkowicie.
}

// Inicjalizujemy AI tylko jeśli klucz jest dostępny.
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export async function sendMessageToGemini(message: string): Promise<string> {
  if (!ai) {
    return "Błąd konfiguracji: Klucz API nie jest dostępny. Sprawdź, czy został poprawnie skonfigurowany w pliku .env i czy aplikacja została przebudowana.";
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
    // Zwracamy bardziej szczegółowy błąd, który może pomóc w diagnozie.
    return `Wystąpił błąd podczas komunikacji z asystentem AI. Proszę spróbować ponownie później. (Szczegóły: ${error.message})`;
  }
}
