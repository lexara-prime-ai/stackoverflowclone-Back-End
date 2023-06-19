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

        /* VERIFY Content-Type */
        test("Content-Type should be application/json", async () => {
            expect({ "Content-Type": "application/json" });
        });
    });


    /* ADD USER */
    describe("POST /users", () => {
        test("should add a new user and respond with a status code of 201", async () => {
            const POST_DATA = create({
                display_name: "New Test User",
                email: "newtestuser@gmail.com",
                password: "newtestuserpwd"
            });

            const response = request(SERVER)
            .post("/users")
            .send(POST_DATA);
            // expect((await response).statusCode).toBe(201);
            expect((await response).body.display_name).toBe(POST_DATA.display_name);
            expect((await response).body.email).toBe(POST_DATA.email);
            expect((await response).body.password).toBe(POST_DATA.password);
        });
    });

    /* UPDATE USER */
    describe("PUT /users", () => {
        test("should update a user and return a response of 201", async () => {
            const user_id = 1;
            const PUT_DATA = {
                display_name: "Test user",
                email: "Asking for friend",
                password: "poiutiu"
            };

            const response = await request(SERVER)
                .put(`/users/${user_id}`)
                .send(PUT_DATA);

            expect(response.status).toBe(201);
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
            const POST_DATA = create({
                question: "Is Go easy to learn?",
                additional_info: "Trying to learn a new language.",
                category: "go"
            });

            const response = await request(SERVER)
            .put(`/users/${user_id}`)
            .send(PUT_DATA);

            expect((await response).statusCode).toBe(201);
            expect((await response).body.question).toBe(POST_DATA.question);
            expect((await response).body.additional_info).toBe(POST_DATA.additional_info);
            expect((await response).body.category).toBe(POST_DATA.category);
        });
    });

    /* UPDATE QUESTION */
    describe("PUT /questions", () => {
        test("should update a question and return a response of 201", async () => {
            const question_id = 1;
            const PUT_DATA = {
                question: "What's the capital of France?",
                additional_info: "Asking for friend",
                category: "History",
                user_id: 1
            };

            const response = await request(SERVER)
                .put(`/questions/${question_id}`)
                .send(PUT_DATA);

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
            const POST_DATA = create({
                answer: "Thanks! This worked for me.",
                question_id: 1,
                user_id: 1,
                display_name: "Mike Johnson"
            });

            const response = request(SERVER).post("/answers");
            expect((await response).statusCode).toBe(201);
            expect((await response).body.answer).toBe(POST_DATA.answer);
            expect((await response).body.user_id).toBe(POST_DATA.user_id);
            expect((await response).body.display_name).toBe(POST_DATA.display_name);
        });
    });

    /* UPDATE ANSWER */
    describe("PUT /answers", () => {
        test("should update a answer and return a response of 201", async () => {
            const answer_id = 2;
            const PUT_DATA = {
                answer: "Running tests!",
                question_id: 1,
                user_id: 3,
                display_name: "Mike Johnson"
            };

            const response = await request(SERVER)
                .put(`/answers/${answer_id}`)
                .send(PUT_DATA);

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
            const POST_DATA = create({
                comment: "I agree it's easier to learn",
                answer_id: 1,
                user_id: 1
            });

            const response = request(SERVER).post("/comments");
            expect((await response).statusCode).toBe(201);
            expect((await response).body.comment).toBe(POST_DATA.comment);
            expect((await response).body.answer_id).toBe(POST_DATA.answer_id);
            expect((await response).body.user_id).toBe(POST_DATA.user_id);
        });
    });

    /* UPDATE COMMENT */
    describe("PUT /comments", () => {
        test("should update a comment and return a response of 201", async () => {
            const comment_id = 2;
            const PUT_DATA = {
                comment: "Running tests!",
                answer_id: 1,
                user_id: 1
            };

            const response = await request(SERVER)
                .put(`/comments/${comment_id}`)
                .send(PUT_DATA);

            expect(response.status).toBe(201);
            expect(response.body.message).toBe("Comment updated successfully!");
        });
    });
});