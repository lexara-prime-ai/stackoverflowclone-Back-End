const request = require('supertest');
const SERVER = require('../SERVER/build/server');

/* USERS */
describe("GET /users", () => {
    /* GET ALL USERS */
    describe("Get all users", () => {
        test("should respond with a status code of 200", async () => {
            const response = await request(SERVER).get("/users");
            expect(response.statusCode).toBe(200);
        })
    })
})

/* QUESTIONS */
describe("GET /questions", () => {
    /* GET ALL QUESTIONS */
    describe("Get all questions", () => {
        test("should respond with a status code of 200", async () => {
            const response = await request(SERVER).get("/questions");
            expect(response.statusCode).toBe(200);
        })
    })
})