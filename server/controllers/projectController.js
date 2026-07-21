const Project = require("../models/Project");
const User = require("../models/User");

// ======================================
// Create Project
// POST /api/projects
// ======================================

const createProject = async (req, res) => {
  try {
    const title = req.body.title?.trim();
    const description = req.body.description?.trim();
    const { status } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and Description are required.",
      });
    }

    // Find logged-in user
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Free user project limit
    const projectCount = await Project.countDocuments({
      owner: req.user.id,
    });

    if (!user.isPremium && projectCount >= 3) {
      return res.status(403).json({
        success: false,
        premiumRequired: true,
        message:
          "Free users can create only 3 projects. Upgrade to Premium.",
      });
    }

    const project = await Project.create({
      title,
      description,
      status,
      owner: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get All Projects
// GET /api/projects
// ======================================

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      owner: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get Single Project
// GET /api/projects/:id
// ======================================

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ======================================
// Update Project
// PUT /api/projects/:id
// ======================================

const updateProject = async (req, res) => {
  try {
    // Find project by ID
    const project = await Project.findById(req.params.id);

    // Check if project exists
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Ownership validation
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Forbidden. You are not allowed to update this project.",
      });
    }

    // Update only provided fields
    project.title = req.body.title?.trim() || project.title;
    project.description =
      req.body.description?.trim() || project.description;
    project.status = req.body.status || project.status;

    // Save updated project
    await project.save();

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Delete Project
// DELETE /api/projects/:id
// ======================================

const deleteProject = async (req, res) => {
  try {
    // Find project by ID
    const project = await Project.findById(req.params.id);

    // Check if project exists
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Ownership validation
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Forbidden. You are not allowed to delete this project.",
      });
    }

    // Delete project
    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Export Controllers
// ======================================

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};