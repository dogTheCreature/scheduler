// tests/testUtils.js
const pool = require('../config/db');

async function setupDatabase() {
  const connection = await pool.getConnection();
  try {
    console.log('Starting database setup...');
    // 初期化SQLはコンテナ起動時に実行されるため、ここでは追加の設定が不要
  } finally {
    connection.release();
    console.log('Database setup complete.');
  }
}

async function teardownDatabase() {
  const connection = await pool.getConnection();
  try {
    console.log('Starting database teardown...');
    // テスト用データの削除やテーブルのドロップなど
  } catch (err) {
    console.error('Error during database teardown:', err);
    throw err;
  } finally {
    await pool.end();
    console.log('Database pool ended.');
  }
}

module.exports = {
  setupDatabase,
  teardownDatabase,
};
