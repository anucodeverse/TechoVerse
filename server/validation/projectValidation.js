const Joi = require("joi");

// ===============================
// Create Project Validation
// ===============================

const createProjectSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.empty": "Title is required.",
      "string.min": "Title must be at least 3 characters.",
      "string.max": "Title cannot exceed 100 characters.",
      "any.required": "Title is required.",
    }),

  description: Joi.string()
    .trim()
    .min(5)
    .max(500)
    .required()
    .messages({
      "string.empty": "Description is required.",
      "string.min": "Description must be at least 5 characters.",
      "string.max": "Description cannot exceed 500 characters.",
      "any.required": "Description is required.",
    }),

  status: Joi.string()
    .valid("Pending", "In Progress", "Completed")
    .required()
    .messages({
      "string.empty": "Status is required.",
      "any.required": "Status is required.",
      "any.only": "Status must be Pending, In Progress or Completed.",
    }),
}).options({
  abortEarly: true,
  allowUnknown: false,
});

// ===============================
// Update Project Validation
// ===============================

const updateProjectSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .messages({
      "string.min": "Title must be at least 3 characters.",
      "string.max": "Title cannot exceed 100 characters.",
    }),

  description: Joi.string()
    .trim()
    .min(5)
    .max(500)
    .messages({
      "string.min": "Description must be at least 5 characters.",
      "string.max": "Description cannot exceed 500 characters.",
    }),

  status: Joi.string()
    .valid("Pending", "In Progress", "Completed")
    .messages({
      "any.only": "Status must be Pending, In Progress or Completed.",
    }),
})
  .min(1)
  .messages({
    "object.min": "Please provide at least one field to update.",
  })
  .options({
    abortEarly: true,
    allowUnknown: false,
  });

// ===============================
// Export
// ===============================

module.exports = {
  createProjectSchema,
  updateProjectSchema,
};