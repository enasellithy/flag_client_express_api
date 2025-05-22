const request = require('supertest');
const express = require('express');
const bodyParser = require('express').json;
const flagsRouter = require('../routes/flags');

const app = express();
app.use(express.json());
app.use('/flags', flagsRouter);

describe('Feature Flag API', () => {
  it('should create a new feature flag', async () => {
    const res = await request(app)
      .post('/flags')
      .send({
        flagName: 'testFlag',
        description: 'A flag for testing',
        enabledByDefault: true
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('flagName', 'testFlag');
  });

  it('should fail to create a flag without flagName', async () => {
    const res = await request(app)
      .post('/flags')
      .send({
        description: 'Missing flagName',
        enabledByDefault: false
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body.errors[0].msg).toBe('flagName is required');
  });

  it('should list all global feature flags', async () => {
    const res = await request(app).get('/flags');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
