import OpenAI from "openai";

const openaiApiKey = process.env.OPENAI_API_KEY;
console.log("OPENAI_API_KEY în lib/openai.js:", openaiApiKey ? "Setată (lungime: " + openaiApiKey.length + ")" : "Nesetată");

if (!openaiApiKey) {
  throw new Error("OPENAI_API_KEY nu este definit în environment variables! Asigură-te că variabila este setată în Vercel.");
}

const openai = new OpenAI({
  apiKey: openaiApiKey,
});

export default openai;