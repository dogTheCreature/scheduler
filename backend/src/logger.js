// logger.js
const winston = require('winston');
const path = require('path');

const logDirectory = path.join(__dirname, '../logs');

// ログディレクトリが存在しない場合は作成
if (!require('fs').existsSync(logDirectory)) {
  require('fs').mkdirSync(logDirectory);
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(logDirectory, 'error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(logDirectory, 'combined.log') })
  ]
});

module.exports = logger;
