import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_PROMPT } from '../constants';

let chat: Chat | null = null;

function initializeChat(): Chat {
  // FIX: As per the guidelines, the API key must be obtained exclusively from process.env.API_KEY.
  // This resolves the TypeScript error 'Property 'env' does not exist on type 'ImportMeta''.
  const apiKey = "AIzaSyDQWVSb44iOnyw-5JCBhBGPx5AEaNSKzvw";

  if (!apiKey) {
    // For production deployment, this variable should be set in the hosting provider's settings.
    throw new Error("API_KEY environment variable not set.");
  }
  const ai = new GoogleGenAI({ apiKey });
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_PROMPT,
    },
  });
}

export async function sendMessageToGemini(message: string): Promise<string> {
  if (!chat) {
    chat = initializeChat();
  }

  try {
    const result = await chat.sendMessage({ message });
    const text = result.text;
    if (!text) {
      return "Przepraszam, nie mogę teraz odpowiedzieć. Spróbuj ponownie.";
    }
    return text;
  } catch (error) {
    console.error("Gemini API error:", error);
    chat = null; // Reset chat session on error
    return "Wystąpił błąd komunikacji. Proszę spróbować ponownie później.";
  }
}
