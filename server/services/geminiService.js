const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
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

Generate useful development tasks for this project.

Return only a list of tasks.
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
};


module.exports = {
  generateTaskSuggestions,
};