/* CORE MODULES */
/* THIRD PARTY MODULES */
import express from 'express';
import { json } from 'express';
import cors from 'cors';
import userRoutes from './routes/user-routes';

/* INITIALIZE SERVER */
const SERVER = express();
const PORT = 8000;
/* MIDDLEWARE */
SERVER.use(cors({
    origin: "*"
}));

SERVER.use(json());

/* ROUTES */
SERVER.use('/users', userRoutes);

SERVER.get('/', (req, res) => {
    res.send("App is running!");
})

SERVER.listen(PORT, () => console.log(`App is running at: http://localhost:${PORT}`));