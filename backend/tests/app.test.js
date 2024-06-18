// tests/app.test.js
const request = require('supertest');
const { app, server } = require('../src/index');
const { setupDatabase, teardownDatabase } = require('./testUtils');

beforeAll(async () => {
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
    await setupDatabase();
});

afterAll(async () => {
    console.log('Starting teardown process...');

    try {
        await teardownDatabase();
        console.log('Database teardown complete.');
    } catch (err) {
        console.error('Error during database teardown:', err);
    }

    try {
        await new Promise((resolve, reject) => {
            console.log('Attempting to close the server...');
            server.close((err) => {
                if (err) {
                    console.error('Error closing the server:', err);
                    return reject(err);
                }
                console.log('Server closed successfully.');
                resolve();
            });
        });
    } catch (err) {
        console.error('Error during server close:', err);
    }

    console.log('Teardown process complete.');
});

describe('GET /api/users', () => {
    it('should respond with a 200 status code', async () => {
        const response = await request(app).get('/api/users');
        expect(response.status).toBe(200);
    });
});
