
const pool = require('../db');

exports.franchiseLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await pool.query("SELECT password FROM users WHERE username = $1", [username]);
    const ro = await pool.query("SELECT role FROM users WHERE username = $1", [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    if (result.rows[0].password === password && ro.rows[0].role === "franchise") {
      return res.status(200).json({ message: "Login successful" });
    } else if (ro.rows[0].role !== "franchise") {
      return res.status(401).json({ error: "Not an franshise manager" });
    } else {
      return res.status(401).json({ error: "Invalid password" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};
