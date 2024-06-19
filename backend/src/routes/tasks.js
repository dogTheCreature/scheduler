const express = require('express');
const router = express.Router();
const pool = require('../../config/db');

// Get all tasks
router.get('/', async (req, res, next) => {
  try {
    const connection = await pool.getConnection();
    const rows = await connection.query("SELECT * FROM tasks");
    res.json(rows);
    connection.release();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
