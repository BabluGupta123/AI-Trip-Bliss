// src/service/AIModel.js

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY,
});

// Exported function to call Gemini API
export async function generateTripPlan(prompt) {
  const model = "gemini-2.5-flash";
  const contents = [
    {
      role: "user",
      parts: [{ text: prompt }],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    contents,
  });

  let result = "";
  for await (const chunk of response) {
    if (chunk.text) {
      result += chunk.text;
    }
  }

  return result; // return full response text
}
