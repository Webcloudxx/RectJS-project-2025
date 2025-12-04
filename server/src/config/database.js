import mongoose from 'mongoose';
import { DB_URI } from './env.js';

export async function initDatabase() {
  try {
    await mongoose.connect(DB_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
}