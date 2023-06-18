const request = require('supertest');
const SERVER = require('../SERVER/build/server');

describe("GET /users", () => {
    /* GET ALL USERS */
    describe("Get all users", () => {
        test("should respond with a status code of 200", async () => {
            const response = await request(SERVER).get("/users");
            expect(response.statusCode).toBe(200);
        })
    })
})