const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/authController");

// Admin login route
router.post("/admin/login", login);

// Signup route
router.post("/signup", register);

module.exports = router;
