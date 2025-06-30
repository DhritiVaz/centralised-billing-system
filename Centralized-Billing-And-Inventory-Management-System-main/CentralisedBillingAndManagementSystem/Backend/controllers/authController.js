const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// ========================== LOGIN ==========================
exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    const userResult = await db.query('SELECT * FROM users WHERE "Username" = $1', [username]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials: User not found.' });
    }

    const user = userResult.rows[0];

    if (user.Role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Not an admin user.' });
    }

    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials: Password incorrect.' });
    }

    const payload = {
      user: {
        id: user.id,
        username: user.Username,
        role: user.Role,
      },
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({
        token,
        user: {
          id: user.id,
          username: user.Username,
          role: user.Role,
        },
      });
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Server error during login.');
  }
};

// ========================== REGISTER ==========================
exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Username, password, and role are required for registration.' });
  }

  const validRoles = ['admin', 'owner', 'franchise', 'cashier'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: 'Invalid role provided.' });
  }

  try {
    const userResult = await db.query('SELECT * FROM users WHERE username = $1', [username]);

    if (userResult.rows.length > 0) {
      return res.status(400).json({ message: 'Username already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUserResult = await db.query(
  'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id, username, role, created_at',
  [username, hashedPassword, role]
);


    const newUser = newUserResult.rows[0];

    const payload = {
      user: {
        id: newUser.id,
        username: newUser.username,
role: newUser.role

      },
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.status(201).json({
        token,
        user: newUser,
      });
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server error during registration.' });
  }
};
