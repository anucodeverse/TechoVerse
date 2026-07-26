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

  res.status(500).json({
    success: false,
    message: "AI generation failed",
    error: error.message,
  });
}

};


module.exports = {
  suggestTasks,
};