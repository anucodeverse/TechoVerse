const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const generateTaskSuggestions = async (
  projectTitle,
  description
) => {
  try {

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",

      messages: [
        {
          role: "system",
          content:
            "You are an expert project manager. Generate useful software development tasks.",
        },

        {
          role: "user",
          content: `
Create 5 development tasks for this project.

Project Title:
${projectTitle}

Description:
${description}

Return only a numbered list of tasks.
          `,
        },
      ],
    });


    return response.choices[0].message.content;

  } catch (error) {

    console.error("OpenAI Error:", error.message);

    throw new Error(
      "AI service failed"
    );
  }
};


module.exports = {
  generateTaskSuggestions,
};