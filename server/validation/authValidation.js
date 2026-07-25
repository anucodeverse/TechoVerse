const Joi = require("joi");

// ===============================
// Register Validation
// ===============================

const registerSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .required()
    .messages({
      "string.empty": "Name is required.",
      "string.min": "Name must be at least 3 characters.",
      "string.max": "Name cannot exceed 50 characters.",
      "any.required": "Name is required.",
    }),

  email: Joi.string()
    .trim()
    .email()
    .required()
    .messages({
      "string.email": "Invalid email address.",
      "string.empty": "Email is required.",
      "any.required": "Email is required.",
    }),

  password: Joi.string()
    .min(6)
    .max(20)
    .required()
    .messages({
      "string.empty": "Password is required.",
      "string.min": "Password must contain at least 6 characters.",
      "string.max": "Password cannot exceed 20 characters.",
      "any.required": "Password is required.",
    }),
}).options({
  abortEarly: true,
  allowUnknown: false,
});

// ===============================
// Login Validation
// ===============================

const loginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email()
    .required()
    .messages({
      "string.email": "Invalid email address.",
      "string.empty": "Email is required.",
      "any.required": "Email is required.",
    }),

  password: Joi.string()
    .required()
    .messages({
      "string.empty": "Password is required.",
      "any.required": "Password is required.",
    }),
}).options({
  abortEarly: true,
  allowUnknown: false,
});

module.exports = {
  registerSchema,
  loginSchema,
};