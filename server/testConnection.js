require("dotenv").config();
const mongoose = require("mongoose");

async function testConnection() {
  try {
    console.log("Trying to connect...");
    console.log(process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected Successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Full Error:");
    console.error(err);
    process.exit(1);
  }
}

testConnection();