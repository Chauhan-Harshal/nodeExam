const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

// secret for JWT; 
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const JWT_EXPIRES_IN = '1h';

exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'username, email and password required' });
    }
    const created = await userModel.createUser({ username, email, password, role });
    if (!created) return res.status(409).json({ message: 'User already exists' });
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = userModel.findByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const valid = await userModel.verifyPassword(user, password);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const payload = { email: user.email, role: user.role };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  // send as http-only cookie
  res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
  res.json({ message: 'Logged in' });
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};
