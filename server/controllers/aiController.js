const {
  generateTaskSuggestions,
} = require("../services/geminiService");


const suggestTasks = async (req, res) => {

  try {

    const {
      projectTitle,
      description,
    } = req.body;


    if (!projectTitle || !description) {
      return res.status(400).json({
        success:false,
        message:
        "Project title and description are required.",
      });
    }


    const suggestions =
      await generateTaskSuggestions(
        projectTitle,
        description
      );


    res.status(200).json({
  success: true,
  tasks: suggestions.tasks,
});


  } catch (error) {
  console.error("AI Error:", error);

  // Gemini quota exceeded
  if (
    error.message &&
    (
      error.message.includes("RESOURCE_EXHAUSTED") ||
      error.message.includes("Quota exceeded")
    )
  ) {
    return res.status(429).json({
      success: false,
      message: "Gemini API quota exceeded. Please try again later.",
    });
  }

  res.status(500).json({
    success: false,
    message: "AI generation failed",
  });
}

};


module.exports = {
  suggestTasks,
};