/* CORE MODULES */
/* THIRD PARTY MODULES */
import express, { NextFunction, Request, Response } from 'express';
import { json } from 'express';
import cors from 'cors';
import userRoutes from './routes/user-routes';
import questionRoutes from './routes/question-routes';
import commentRoutes from './routes/comment-routes';

/* INITIALIZE SERVER */
const SERVER = express();
const PORT = 8000;
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
SERVER.use('/users', userRoutes);
SERVER.use('/questions', questionRoutes);
SERVER.use('/comments', commentRoutes);

SERVER.get('/', (req, res) => {

    res.send("App is running!");
})

SERVER.listen(PORT, () => console.log(`App is running at: http://localhost:${PORT}`));

module.exports = SERVER;