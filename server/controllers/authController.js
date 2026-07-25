const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  registerSchema,
  loginSchema,
} = require("../validation/authValidation");
// ================= REGISTER =================

const registerUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;

   const { error, value } = registerSchema.validate(req.body);

if (error) {
  return res.status(400).json({
    success: false,
    message: error.details[0].message,
  });
}

name = value.name;
email = value.email.toLowerCase();
password = value.password;

    // Check Existing User
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Registration Successful",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isPremium: user.isPremium,
        plan: user.plan,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= LOGIN =================

const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    const { error, value } = loginSchema.validate(req.body);

if (error) {
  return res.status(400).json({
    success: false,
    message: error.details[0].message,
  });
}

email = value.email.toLowerCase();
password = value.password;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // JWT
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,

        // Always from Database
        isPremium: user.isPremium,
        plan: user.plan,
        paymentDate: user.paymentDate,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= PROFILE =================

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};