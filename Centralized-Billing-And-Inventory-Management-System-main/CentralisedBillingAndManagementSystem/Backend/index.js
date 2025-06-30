/*// backend/index.js (or your main server file)
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db'); // To initialize connection logging

const authRoutes = require('./routes/authRoute');
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse JSON bodies
// Define Routes
app.use('/api/auth', authRoutes);
// Add other routes here later: app.use('/api/users', userRoutes); etc.

app.get('/', (req, res) => {
    res.send('Auth API Running!');
});
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});*/

const express=require("express");
const app=express();
const cors=require("cors");
const pool = require("./db");
const franchiseRoutes = require('./routes/franchiseRoute');

//middleware
app.use(cors());
app.use(express.json());
//ROUTES
app.use('/api/admin', franchiseRoutes);
//Checking for authentication
const bcrypt = require('bcryptjs');

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("📩 Login attempt:", { username, password });

    const userResult = await pool.query("SELECT password, role FROM users WHERE username = $1", [username]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const user = userResult.rows[0];

    // ✅ Use bcrypt.compare here
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ error: "Not an admin" });
    }

    console.log("✅ Admin login successful");
    return res.status(200).json({ message: "Login successful" });

  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

pool.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error("❌ DB Connection Failed:", err.message);
  } else {
    console.log("✅ DB Connected at", result.rows[0].now);
  }
});



app.listen(5000,()=>{
    console.log("server has started on port 5000")
})

const authRoutes = require('./routes/authRoute');
app.use('/api/auth', authRoutes);  // ✅ Enables /api/auth/signup



app.use('/api/auth', require('./routes/authRoute'));const authRoute = require('./routes/authRoute');
app.use('/api/auth', authRoute);
