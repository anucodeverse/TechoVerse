const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateTaskSuggestions = async (projectTitle, description) => {
  const prompt = `
You are an AI project management assistant.

Project Title:
${projectTitle}

Project Description:
${description}

Generate exactly 6 development tasks.

Return ONLY a valid JSON object in this format:

{
  "tasks": [
    "Task 1",
    "Task 2",
    "Task 3",
    "Task 4",
    "Task 5",
    "Task 6"
  ]
}

Do not include markdown, backticks, explanations, or any extra text.
`;

  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents: prompt,
  });

  return JSON.parse(response.text);
};

module.exports = {
  generateTaskSuggestions,
};