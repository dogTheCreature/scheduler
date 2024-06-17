const express = require('express');
const morgan = require('morgan');
const logger = require('./logger'); // ロガーをインポート
const db = require('./config/db');

const app = express();
const port = 5000;

app.use(express.json());

// MorganとWinstonを組み合わせる
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

// Sample route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Add your routes here
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

// エラーハンドリングミドルウェア
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
