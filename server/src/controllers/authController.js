import { User } from '../models/User.js';
import { createToken } from '../utils/token.js';

export async function register(req, res) {
  try {
    const { email, password, rePassword, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (password !== rePassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    const user = await User.create({ email, password, username });
    const token = createToken(user);

    res.status(201).json({
      _id: user._id,
      email: user.email,
      username: user.username,
      accessToken: token
    });
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ message: 'Registration failed.' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.validatePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = createToken(user);

    res.json({
      _id: user._id,
      email: user.email,
      username: user.username,
      accessToken: token
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Login failed.' });
  }
}

export async function logout(_req, res) {
  res.json({ message: 'Logged out' });
}