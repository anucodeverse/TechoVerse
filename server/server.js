const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
const projectRoutes = require("./routes/projectRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

// Hide Express Signature
app.disable("x-powered-by");

// Connect MongoDB
connectDB();


// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://techo-verse-fg99.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without origin (Postman, mobile apps)
      if (!origin) {
        return callback(null, true);
      }

      // Allow main Vercel domain and preview deployments
      if (
        origin.endsWith(".vercel.app")
      ) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
    credentials: true,
  })
);
// Body Parser
app.use(
  express.json({
    limit: "10mb",
  })
);

// Home Route
app.get("/", (req, res) => {
  res.send("🚀 TechoVerse Authentication API is Running...");
});

// Authentication Routes
app.use("/api/auth", authRoutes);

// Project Routes
app.use("/api/projects", projectRoutes);

// Payment Routes
app.use("/api/payment", paymentRoutes);

// Protected Profile Route
app.get("/api/auth/profile", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to TechoVerse Dashboard",
    user: req.user,
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.info(`🚀 Server running on port ${PORT}`);
});