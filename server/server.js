const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");

const app = express();

// =====================
// Connect MongoDB
// =====================
connectDB();

// =====================
// CORS Configuration
// =====================
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://techo-verse-op9a.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// =====================
// Body Parser
// =====================
app.use(express.json());

// =====================
// Home Route
// =====================
app.get("/", (req, res) => {
  res.send("🚀 TechoVerse Authentication API is Running...");
});

// =====================
// Authentication Routes
// =====================
app.use("/api/auth", authRoutes);

// =====================
// Protected Route
// =====================
app.get("/api/auth/profile", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to TechoVerse Dashboard",
    user: req.user,
  });
});

// =====================
// 404 Handler
// =====================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// =====================
// Start Server
// =====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
