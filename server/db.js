import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false;

export const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/high_skill_taekwondo';

  try {
    mongoose.set('strictQuery', false);
    
    // Set a short timeout so local testing doesn't hang if MongoDB service is not started
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 4000,
    });

    isConnected = true;
    console.log(`✅ [MongoDB] Successfully connected to database: ${mongoose.connection.host}`);
  } catch (err) {
    console.warn(`⚠️ [MongoDB] Could not connect to MongoDB at ${mongoUri}.`);
    console.warn(`ℹ️ [Notice] Operating in resilient memory-store fallback mode. Submissions will be saved in memory so all forms, validations, and the Admin Dashboard work immediately!`);
    console.warn(`👉 To connect your live database, add your MongoDB Atlas URI or local MongoDB connection in .env (MONGODB_URI).`);
    isConnected = false;
  }
};

export const getDbStatus = () => ({
  connected: isConnected && mongoose.connection.readyState === 1,
  host: isConnected ? mongoose.connection.host : 'Memory/Fallback Mode',
});
