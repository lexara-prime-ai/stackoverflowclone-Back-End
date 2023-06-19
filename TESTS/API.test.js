const request = require('supertest');
const create = require('supertest');
const SERVER = require('../SERVER/build/server');

/************* USERS *************/
describe("/users", () => {
    /* GET ALL USERS */
    describe("GET /users", () => {
        test("should respond with a status code of 200", async () => {
            const response = await request(SERVER).get("/users");
            expect(response.statusCode).toBe(200);
        });
    });

    /* ADD USER */
    describe("POST /user", () => {
        test("should add a new user and respond with a status code of 200", async () => {
            const POST_DATA = create({
                display_name: "New Test User",
                email: "newtestuser@gmail.com",
                password: "newtestuserpwd"
            });

            const response = request(SERVER).post("/users");
            expect((await response).body[0].display_name).toBe(POST_DATA.display_name);
            expect((await response).body[0].email).toBe(POST_DATA.email);
            expect((await response).body[0].password).toBe(POST_DATA.password);
        });
    });
});

/********* QUESTIONS ***********/
describe("/questions", () => {
    /* GET ALL QUESTIONS */
    describe("GET /questions", () => {
        test("should respond with a status code of 200", async () => {
            const response = await request(SERVER).get("/questions");
            expect(response.statusCode).toBe(200);
        });
    });

    /* ADD QUESTION */
    describe("POST /questions", () => {
        test("should add a new question and respond with a status code of 200", async () => {
            const POST_DATA = create({
                question: "Is Go easy to learn?",
                additional_info: "Trying to learn a new language.",
                category: "go"
            });

            const response = request(SERVER).post("/questions");
            expect((await response).statusCode).toBe(201);
            expect((await response).body.question).toBe(POST_DATA.question);
            expect((await response).body.additional_info).toBe(POST_DATA.additional_info);
            expect((await response).body.category).toBe(POST_DATA.category);
        });
    });
});

/******** ANSWERS *********/
describe("/answers", () => {
    /* GET ALL ANSWERS */
    describe("GET /answers", () => {
        test("should respond with a status code of 200", async () => {
            const response = await request(SERVER).get("/answers");
            expect(response.statusCode).toBe(200);
        });
    });

    /* ADD ANSWER */
    describe("POST /answers", () => {
        test("should add a new answer and respond with a status code of 200", async () => {
            const POST_DATA = create({
                answer: "Thanks! This worked for me.",
                question_id: 1,
                user_id: 1,
                display_name: "Mike Johnson"
            });

            const response = request(SERVER).post("/answers");
            expect(response.statusCode).toBe(201);
            expect((await response).body.answer).toBe(POST_DATA.answer);
            expect((await response).body.user_id).toBe(POST_DATA.user_id);
            expect((await response).body.display_name).toBe(POST_DATA.display_name);
        });
    });
});

/********* COMMENTS *********/
describe("/comments", () => {
    /* GET ALL COMMENTS */
    describe("GET /comments", () => {
        test("should respond with a status code of 200", async () => {
            const response = await request(SERVER).get("/comments");
            expect(response.statusCode).toBe(200);
        });
    });

    /* ADD COMMENT */
    describe("POST /comments", () => {
        test("should add a new comment and respond with a status code of 200", async () => {
            const POST_DATA = create({
                comment: "I agree it's easier to learn",
                answer_id: 1,
                user_id: 1
            });

            const response = request(SERVER).post("/comments");
            expect(response.statusCode).toBe(201);
            expect((await response).body.comment).toBe(POST_DATA.comment);
            expect((await response).body.answer_id).toBe(POST_DATA.answer_id);
            expect((await response).body.user_id).toBe(POST_DATA.user_id);
        });
    });
});