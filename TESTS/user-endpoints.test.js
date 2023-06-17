const request = require('supertest');
const SERVER = require('../SERVER/build/server');

let server;

beforeAll((done) => {
    server = SERVER.listen(8000, () => {
        console.log('SERVER is running at: http://localhost:8000');
        done();
    });
});

afterAll((done) => {
    server.close(done);
});

test('GET /users', async () => {
    const response = await request(SERVER).get('/users');

    /* ASSERTIONS */
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toBeDefined();
});
