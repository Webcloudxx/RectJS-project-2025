import { verifyToken } from '../utils/token.js';

export function authMiddleware(req, _res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    req.user = null;
    return next();
  }

  const [type, token] = authHeader.split(' ');

  if (type !== 'Bearer' || !token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
  } catch (_err) {
    req.user = null;
  }

  next();
}

export function isAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: 'You must be logged in.' });
  }
  next();
}