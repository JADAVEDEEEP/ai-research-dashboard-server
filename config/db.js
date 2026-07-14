const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing.");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
    });

    console.log("Database connected successfully");
  } catch (err) {
    console.error("Error in connecting to database:", err.message);
    throw err;
  }
};

module.exports = connectdb;
