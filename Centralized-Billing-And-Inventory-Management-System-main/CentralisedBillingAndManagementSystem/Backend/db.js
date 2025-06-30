// backend/db.js
console.log("✅ db.js loaded");

const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "Kookie@postgres",
  host: "localhost",
  port: 5432,
  database: "central_billing_system",
});

pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL database!");
});

pool.on("error", (err) => {
  console.error("❌ Unexpected error on idle client:", err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
