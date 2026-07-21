const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.info("🔄 Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGODB_URI);

    console.info("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;