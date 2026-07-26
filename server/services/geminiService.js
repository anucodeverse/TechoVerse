const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateTaskSuggestions = async (
  projectTitle,
  description
) => {

  const prompt = `
You are an AI project management assistant.

Project Title:
${projectTitle}

Project Description:
${description}

Generate 6 development tasks for this project.

Return only a bullet list.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
};

module.exports = {
  generateTaskSuggestions,
};