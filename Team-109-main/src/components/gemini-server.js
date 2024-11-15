/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};


export async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
    ],
  });
  const formattedPrompt = `
  - Prompt: ${prompt}.
  - Respond 'Not related.' if prompt is unrelated to blood glucose or not given.
  - Else, give a max 2 sentence response about how prompt relates to blood glucose.
  `;
  const result = await chatSession.sendMessage(formattedPrompt);
  return result.response.text()
}

export function transformTextToHtml(inputText) {
  let transformedText = inputText.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
  transformedText = transformedText.replace(/##(.*?)\n/g, '<b>$1</b><br>');
  transformedText = transformedText.replace(/\n/g, '<br>');
  return transformedText
}
