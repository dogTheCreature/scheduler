const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Get all users
router.get('/', async (req, res, next) => {
  try {
    const connection = await pool.getConnection();
    const rows = await connection.query("SELECT * FROM users");
    res.json(rows);
    connection.release();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
