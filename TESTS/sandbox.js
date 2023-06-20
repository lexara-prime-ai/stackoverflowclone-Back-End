const request = require("supertest");
const create = require('supertest');
const SERVER = require('../SERVER/build/server');

describe("PUT /users", () => {
    test("should update a user and return a response of 201", async () => {
        const user_id = 1;
        const PUT_DATA = {
            display_name: "test user 5",
            email: "tset5@gmail.com",
            password: "testpassword"
        };

        // CREATE PUT REQUEST
        const response = await request(SERVER)
            .put(`/users/${user_id}`)
            .send(PUT_DATA);

        // ASSERTIONS
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe("User updated successfully!");
    });
});