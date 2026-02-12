import { SYSTEM_PROMPT } from '../constants';

// Adres URL Twojego serwera pośredniczącego (np. webhooka z make.com)
// Vite wymaga prefiksu VITE_ dla zmiennych środowiskowych dostępnych w frontendzie
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function sendMessageToGemini(message: string): Promise<string> {
  if (!BACKEND_URL) {
    console.error("VITE_BACKEND_URL is not defined. Please set it in your .env.local file for development.");
    return "Błąd konfiguracji: Brak adresu serwera pośredniczącego. Skontaktuj się z administratorem.";
  }

  try {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        message: message,
        // Możesz wysłać systemowy prompt, aby backend go użył
        systemInstruction: SYSTEM_PROMPT 
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Upewnij się, że backend zwraca pole `text` w odpowiedzi JSON
    const text = data.text;

    if (!text) {
      return "Przepraszam, otrzymałem pustą odpowiedź. Spróbuj ponownie.";
    }
    return text;
  } catch (error) {
    console.error("Backend communication error:", error);
    return "Wystąpił błąd komunikacji z serwerem. Proszę spróbować ponownie później.";
  }
}
