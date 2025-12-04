import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';

export function createToken(user) {
  const payload = {
    _id: user._id.toString(),
    email: user.email,
    username: user.username
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '2d' });
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}