const request = require('supertest');
const create = require('supertest');
const SERVER = require('../SERVER/build/server');

/* GENERATE NEW TOKEN */
let TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3LCJkaXNwbGF5X25hbWUiOiJwaXp6YV90aW1lIiwiZW1haWwiOiJwZXRlcnBhcmtlckBob3RtYWlsLmV1IiwiZW1haWxlZCI6MCwiZGVsZXRlZCI6MCwiYWRtaW4iOjAsImlhdCI6MTY4NzI2ODAyNCwiZXhwIjoxNjg3NjI4MDI0fQ.MWzytOABgxKRlOEpoeWQnuN9KcAqiW1_zxoRyJuErFM';

/************* USERS *************/
describe("/users", () => {
    /* GET ALL USERS */
    describe("GET /users", () => {
        test("should respond with a status code of 200", async () => {
            const response = await request(SERVER).get("/users");
            expect(response.statusCode).toBe(200);
        });

        /* VERIFY Content-Type */
        test("Content-Type should be application/json", async () => {
            expect({ "Content-Type": "application/json" });
        });
    });

    /* ADD USER */
    describe("POST /users", () => {
        test("should add a new user and respond with a status code of 201", async () => {
            // WILL FAIL IF display_name
            // AND email EXISTS AS A
            // RESULT OF UNIQUE CONSTRAINTS
            const USER_DATA = create({
                display_name: "NEW_USER_4",
                email: "new_user_4@gmail.com",
                password: "NEW_USER_4"
            });

            const POST_DATA = {
                display_name: "NEW_USER_4",
                email: "new_user_4@gmail.com",
                password: "NEW_USER_4"
            };

            // CREATE POST REQUEST
            const response = request(SERVER)
                .post("/users")
                .set("Content-type", "application/json")
                .send(POST_DATA);

            // ASSERTIONS
            expect((await response).statusCode).toBe(201);
            expect((await response).body.display_name).toBe(USER_DATA.display_name);
            expect((await response).body.email).toBe(USER_DATA.email);
            expect((await response).body.password).toBe(USER_DATA.password);
        });
    });

    /* UPDATE USER */
    describe("PUT /users", () => {
        test("should update a user and return a response of 201", async () => {
            const user_id = 2;
            const PUT_DATA = {
                display_name: "UPDATED",
                email: "UPDATED",
                password: "UPDATED"
            };

            // CREATE PUT REQUEST
            const response = await request(SERVER)
                .put(`/users/${user_id}`)
                .set("TOKEN", TOKEN)
                .send(PUT_DATA);

            // ASSERTIONS
            expect(response.statusCode).toBe(201);
            expect(response.body.message).toBe("User updated successfully!");
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

        /* VERIFY Content-Type */
        test("Content-Type should be application/json", async () => {
            expect({ "Content-Type": "application/json" });
        });
    });

    /* ADD QUESTION */
    describe("POST /questions", () => {
        test("should add a new question and respond with a status code of 201", async () => {
            const QUESTION_DATA = create({
                question: "NEW QUESTION...",
                additional_info: "ADDITIONAL INFO...",
                category: "CATEGORY...",
                user_id: 1
            });

            const POST_DATA = {
                question: "NEW QUESTION...",
                additional_info: "ADDITIONAL INFO...",
                category: "CATEGORY...",
                user_id: 1
            };

            // CREATE POST REQUEST
            const response = request(SERVER)
                .post("/questions")
                .set("TOKEN", TOKEN)
                .send(POST_DATA);

            // ASSERTIONS
            expect((await response).statusCode).toBe(201);
            expect((await response).body.question).toBe(QUESTION_DATA.question);
            expect((await response).body.additional_info).toBe(QUESTION_DATA.additional_info);
            expect((await response).body.category).toBe(QUESTION_DATA.category);
        });
    });

    //     /* UPDATE QUESTION */
    describe("PUT /questions", () => {
        test("should update a question and return a response of 201", async () => {
            const question_id = 1;
            const PUT_DATA = {
                question: "UPDATED QUESTION",
                additional_info: "UPDATED INFO",
                category: "UPDATED CATEGORY",
                user_id: 1
            };

            // CREATE PUT REQUEST
            const response = await request(SERVER)
                .put(`/questions/${question_id}`)
                .set("TOKEN", TOKEN)
                .send(PUT_DATA);

            // ASSERTIONS
            expect(response.status).toBe(201);
            expect(response.body.message).toBe("Question updated successfully!");
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

        /* VERIFY Content-Type */
        test("Content-Type should be application/json", async () => {
            expect({ "Content-Type": "application/json" });
        });
    });

    /* ADD ANSWER */
    describe("POST /answers", () => {
        test("should add a new answer and respond with a status code of 201", async () => {
            const ANSWER_DATA = create({
                answer: "NEW ANSWER",
                question_id: 1,
                user_id: 3,
                display_name: "irfanghat"
            });

            const POST_DATA = {
                answer: "NEW ANSWER",
                question_id: 1,
                user_id: 3,
                display_name: "irfanghat"
            };

            // CREATE POST REQUEST
            const response = request(SERVER)
                .post("/answers")
                .set("TOKEN", TOKEN)
                .send(POST_DATA);

            // ASSERTIONS
            expect((await response).statusCode).toBe(201);
            expect((await response).body.answer).toBe(ANSWER_DATA.answer);
            expect((await response).body.question_id).toBe(ANSWER_DATA.question_id);
            expect((await response).body.user_id).toBe(ANSWER_DATA.user_id);
            expect((await response).body.display_name).toBe(ANSWER_DATA.display_name);
        });
    });

    /* UPDATE ANSWER */
    describe("PUT /answers", () => {
        test("should update a answer and return a response of 201", async () => {
            const answer_id = 1;
            const PUT_DATA = {
                answer: "UPDATED ANSWER",
                question_id: 1,
                user_id: 3,
                display_name: "irfanghat"
            };

            // CREATE PUT REQUEST
            const response = await request(SERVER)
                .put(`/answers/${answer_id}`)
                .set("TOKEN", TOKEN)
                .send(PUT_DATA);

            // ASSERTIONS
            expect(response.status).toBe(201);
            expect(response.body.message).toBe("Answer updated successfully!");
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

        /* VERIFY Content-Type */
        test("Content-Type should be application/json", async () => {
            expect({ "Content-Type": "application/json" });
        });
    });

    /* ADD COMMENT */
    describe("POST /comments", () => {
        test("should add a new comment and respond with a status code of 201", async () => {
            const COMMENT_DATA = create({
                comment: "NEW COMMENT",
                answer_id: 1,
                user_id: 1
            });

            const POST_DATA = {
                comment: "NEW COMMENT",
                answer_id: 1,
                user_id: 1
            };

            // CREATE POST REQUEST
            const response = request(SERVER)
                .post("/comments")
                .set("TOKEN", TOKEN)
                .send(POST_DATA);

            // ASSERTIONS
            expect((await response).statusCode).toBe(201);
            expect((await response).body.comment).toBe(COMMENT_DATA.comment);
            expect((await response).body.answer_id).toBe(COMMENT_DATA.answer_id);
            expect((await response).body.user_id).toBe(COMMENT_DATA.user_id);
        });
    });

    /* UPDATE COMMENT */
    describe("PUT /comments", () => {
        test("should update a comment and return a response of 201", async () => {
            const comment_id = 2;
            const PUT_DATA = {
                comment: "UPDATED COMMENT",
                answer_id: 1,
                user_id: 1
            };

            // CREATE PUT REQUEST
            const response = await request(SERVER)
                .put(`/comments/${comment_id}`)
                .set("TOKEN", TOKEN)
                .send(PUT_DATA);

            // ASSERTION
            expect(response.status).toBe(201);
            expect(response.body.message).toBe("Comment updated successfully!");
        });
    });


});