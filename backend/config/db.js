const mariadb = require('mariadb');
require('dotenv').config(); // dotenvパッケージを使用して環境変数を読み込む

const pool = mariadb.createPool({
  host: process.env.DB_HOST || 'mariadb', // 環境変数からホストを読み込む、デフォルトは'mariadb'
  user: process.env.DB_USER || 'root', // 環境変数からユーザーを読み込む、デフォルトは'root'
  password: process.env.DB_PASSWORD || 'yourpassword', // 環境変数からパスワードを読み込む
  database: process.env.DB_NAME || 'yourdatabase', // 環境変数からデータベース名を読み込む
  connectionLimit: process.env.DB_CONNECTION_LIMIT || 5, // 環境変数から接続数を読み込む、デフォルトは5
  connectTimeout: process.env.DB_CONNECT_TIMEOUT || 10000 // 環境変数から接続タイムアウトを読み込む、デフォルトは10000ms
});

module.exports = pool;
