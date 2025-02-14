import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.<development/production>.local');
}

// console.log("Connecting to:", DB_URI);

mongoose.set('debug', true);

const connectedToDb = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      tls: true,
      family: 4,
    });
    console.log(`Connected to DB in ${NODE_ENV} mode`);
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1);
  }
};

export default connectedToDb;
