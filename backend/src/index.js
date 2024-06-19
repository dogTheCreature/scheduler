const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const logger = require('./logger'); // ロガーをインポート
const path = require('path');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.join(__dirname, `../.env${process.env.NODE_ENV ? '.' + process.env.NODE_ENV : ''}`) });
}

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
const taskRoutes = require('./routes/tasks');
app.use('/api/tasks', taskRoutes);

// エラーハンドリングミドルウェア
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).send('Something broke!');
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = { app, server };  // serverもエクスポート
