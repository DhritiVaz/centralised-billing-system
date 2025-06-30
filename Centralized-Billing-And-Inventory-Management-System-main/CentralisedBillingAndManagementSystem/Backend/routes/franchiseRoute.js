const express = require('express');
const router = express.Router();
const { getAllFranchisees, franchiseLogin } = require('../controllers/franchiseController');

router.get('/allclients', getAllFranchisees);
router.post('/login', franchiseLogin);

module.exports = router;
