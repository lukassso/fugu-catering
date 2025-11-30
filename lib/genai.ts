import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.warn("Missing GEMINI_API_KEY environment variable. AI features will not work.");
}

export const genai = new GoogleGenAI({
    apiKey: apiKey || "dummy-key",
});
