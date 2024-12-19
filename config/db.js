// config/db.js
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables as early as possible

const connectDB = async () => {
  try {
    // Log to check if the MONGO_URI is being loaded correctly
    console.log('MONGO_URI:', process.env.MONGO_URI);

    if (!process.env.MONGO_URI) {
      throw new Error('MongoDB URI is not defined');
    }

    await mongoose.connect(process.env.MONGO_URI, {
     
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
