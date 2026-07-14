const { GoogleGenAI } = require("@google/genai");
const masterPrompt = require("../prompts/masterPrompt");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateCompanyReport = async (companyName) => {
  try {
    const prompt = masterPrompt(companyName);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,

      config: {
        temperature: 0.3,

        tools: [
          {
            googleSearch: {},
          },
        ],
      },
    });

    const text = response.text.trim();
    

    const report = JSON.parse(text);

    return report;
  } catch (error) {
    console.error("AI Service Error:", error);

    throw new Error("Failed to generate company report.");
  }
};

module.exports = {
  generateCompanyReport,
};
