/* CORE MODULES */
import path from "path";
/* THIRD PARTY MODULES */
import express, { NextFunction, Request, Response } from "express";
import { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
import signUpRouter from "./routers/sign-up-router";
import markAsPreferredRouter from "./routers/mark-as-preferred-router";

/* INITIALIZE SERVER */
const SERVER = express();
const PORT = 5000 || process.env.SERVER_PORT;
/* MIDDLEWARE */
SERVER.use(cors({
    origin: "*"
}));

SERVER.use(json());

/* LOGGING DECORATOR */
function REQUEST_LOGGER(req: Request, res: Response, next: NextFunction) {
    console.log(`Request URL: ${req.url}`);
    console.log(`Request METHOD: ${req.method}`);
    next();
}

/* ROUTES */
SERVER.use(REQUEST_LOGGER);
SERVER.use('/sign-up', signUpRouter);
SERVER.use('/mark-as-preferred', markAsPreferredRouter);

SERVER.get('/', (req, res) => {
    res.send("Mailing API is running...");
});

SERVER.listen(PORT, () => console.log(`

█▀▄▀█ ▄▀█ █ █░░   ▄▀█ █▀█ █
█░▀░█ █▀█ █ █▄▄   █▀█ █▀▀ █

***********************************************
Mailing API is running at: http://localhost:${PORT}
Terminate process : CTRL + C
***********************************************
`));

module.exports = SERVER;