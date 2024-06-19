const mariadb = require('mariadb');
const logger = require('../src/logger'); // ロガーをインポート
require('dotenv').config(); // dotenvパッケージを使用して環境変数を読み込む

logger.debug(process.env.DB_HOST || 'mariadb');
logger.debug(process.env.DB_USER || 'root');
logger.debug(process.env.DB_PASSWORD || 'yourpassword');
logger.debug(process.env.DB_NAME || 'scheduler');

const pool = mariadb.createPool({
  host: process.env.DB_HOST || 'mariadb', // 環境変数からホストを読み込む、デフォルトは'mariadb'
  user: process.env.DB_USER || 'root', // 環境変数からユーザーを読み込む、デフォルトは'root'
  password: process.env.DB_PASSWORD || 'yourpassword', // 環境変数からパスワードを読み込む
  database: process.env.DB_NAME || 'scheduler', // 環境変数からデータベース名を読み込む
  connectionLimit: process.env.DB_CONNECTION_LIMIT || 5, // 環境変数から接続数を読み込む、デフォルトは5
  connectTimeout: process.env.DB_CONNECT_TIMEOUT || 1000 // 環境変数から接続タイムアウトを読み込む、デフォルトは10000ms
});

module.exports = pool;
