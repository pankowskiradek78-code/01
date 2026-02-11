import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("Missing GEMINI_API_KEY env var");
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Prosty “system prompt” — dostosuj pod Queen Beauty
const SYSTEM = `
Jesteś wirtualną asystentką gabinetu kosmetycznego Queen Beauty Anna Pankowska w Rypinie.
Odpowiadasz krótko, konkretnie i uprzejmie. Używaj emoji.
Zawsze dąż do rezerwacji: Booksy / telefon / DM.
Jeśli pytanie jest medyczne: informuj, że to ogólne info i zaproś na konsultację.
Nie używaj słowa "botoks" w reklamowym tonie, możesz pisać: "redukcja zmarszczek".
`;

app.get("/", (_req, res) => res.json({ ok: true }));

app.post("/chat", async (req, res) => {
  try {
    const message = (req.body?.message || "").toString().trim();
    if (!message) return res.status(400).json({ error: "message is required" });

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `${SYSTEM}\n\nUżytkownik: ${message}\nAsystentka:`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text()?.trim() || "Nie udało mi się odpowiedzieć. Napisz proszę jeszcze raz 🙂";

    return res.json({ reply });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ reply: "Wystąpił błąd po stronie serwera. Spróbuj ponownie za chwilę 🙂" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API listening on :${PORT}`));
