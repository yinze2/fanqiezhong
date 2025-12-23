
import { GoogleGenAI, Type } from "@google/genai";
import { TimerMode } from "../types";

// 导出获取 AI 实例的辅助函数，确保始终能拿到最新的 API_KEY
const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is not defined in process.env");
  }
  return new GoogleGenAI({ apiKey: apiKey || "" });
};

export const fetchMotivationalQuote = async (mode: TimerMode): Promise<{ text: string; author: string }> => {
  try {
    const ai = getAI();
    const prompt = mode === TimerMode.WORK 
      ? "Provide a short, powerful motivational quote for someone starting a deep work session."
      : "Provide a short, relaxing quote or mindfulness tip for someone taking a break from work.";

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING },
            author: { type: Type.STRING }
          },
          required: ["text", "author"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return {
      text: result.text || "Focus on being productive instead of busy.",
      author: result.author || "Tim Ferriss"
    };
  } catch (error) {
    console.error("Error fetching quote from Gemini:", error);
    return {
      text: "The secret of getting ahead is getting started.",
      author: "Mark Twain"
    };
  }
};
