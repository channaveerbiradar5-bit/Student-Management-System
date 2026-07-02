const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/sms-db";

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Database connection warning:", error.message);
    console.log("Continuing without MongoDB connection. Start MongoDB to enable data persistence.");
  }
};

module.exports = connectDB