import express from 'express';
import jwt from 'jsonwebtoken';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'high-skill-tkd-super-secure-secret-2026';

// Admin Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Both username and password are required',
    });
  }

  const expectedUsername = process.env.ADMIN_USERNAME || 'admin';
  const expectedPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (username.trim() === expectedUsername && password.trim() === expectedPassword) {
    const token = jwt.sign(
      { username: expectedUsername, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      message: 'Admin authentication successful',
      token,
      username: expectedUsername,
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid username or password',
  });
});

// Verify current session
router.get('/verify', requireAuth, (req, res) => {
  res.json({
    success: true,
    valid: true,
    user: req.user,
  });
});

export default router;
