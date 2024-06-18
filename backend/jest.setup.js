// jest.setup.js
const dotenv = require('dotenv');
const path = require('path');

process.env.NODE_ENV = 'test';
dotenv.config({ path: path.join(__dirname, '.env.test') });
