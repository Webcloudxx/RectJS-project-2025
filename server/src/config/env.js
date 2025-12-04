import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const DB_URI = process.env.DB_URI || 'mongodb://127.0.0.1:27017/car-meet-hub';
export const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecret';
export const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';