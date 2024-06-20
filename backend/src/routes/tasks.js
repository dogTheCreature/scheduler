const express = require('express');
const router = express.Router();
const pool = require('../../config/db');
const axios = require('axios');
const dotenv = require('dotenv');
const logger = require('../logger'); // ロガーをインポート

// Get all tasks
router.get('/', async (req, res, next) => {
  try {
    // const connection = await pool.getConnection();
    // const rows = await connection.query("SELECT * FROM tasks");
    // res.json(rows);
    const response = await axios.get(`https://api.clockify.me/api/v1/workspaces/${WORKSPACE_ID}/projects/${PROJECT_ID}/tasks`, {
      headers: {
        'X-Api-Key': API_KEY
      }
    });
    const tasks = response.data;
    res.json(tasks);
  } catch (err) {
    logger.error(JSON.stringify(process.env,null,2));
    next(err);
  }
});

module.exports = router;
