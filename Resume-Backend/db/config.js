
const mongoose = require('mongoose');

// For development, you can use a local MongoDB or fix the Atlas IP whitelist
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://alamin25_db_user:a8DObKhCmhaVP4pK@resume.rcpp6wk.mongodb.net/?retryWrites=true&w=majority&appName=resume";
// Alternative for local development: "mongodb://localhost:27017/resume"

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Successfully connected to MongoDB Atlas');
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected');
    });
    
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB Atlas:', error);
    throw error;
  }
};

module.exports = { connectToDatabase };

