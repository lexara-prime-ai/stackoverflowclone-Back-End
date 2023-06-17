const request = require('supertest');
const app = require('./app'); // Assuming your Express app is defined in app.js or similar

let server;

beforeAll((done) => {
  server = app.listen(8000, () => {
    console.log('App is running at: http://localhost:8000');
    done();
  });
});

afterAll((done) => {
  server.close(done);
});

test('GET /users', async () => {
  const response = await request(app).get('/users');
  
  expect(response.status).toBe(200);
  expect(response.type).toBe('application/json');
  expect(response.body).toBeDefined();
  // Add more assertions as needed
});
