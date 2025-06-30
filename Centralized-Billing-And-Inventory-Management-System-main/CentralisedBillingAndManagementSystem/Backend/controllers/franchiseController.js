const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Franchise Login Handler
exports.franchiseLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];

    if (user.role !== 'franchise') {
      return res.status(403).json({ error: 'Not a franchise account' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const token = jwt.sign({ id: user.user_id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', role: 'franchise', token });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get All Franchisees Handler
exports.getAllFranchisees = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users WHERE role = $1', ['franchise']);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Get all franchisees error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
