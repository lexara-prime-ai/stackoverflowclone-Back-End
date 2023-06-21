import { Router } from "express";
import { GET_USER_EMAIL } from "../controllers/mailer";
import { RESET_PASSWORD } from "../controllers/reset-password";
import { VERIFY_TOKEN } from "../middleware/VERIFY_TOKENT";

/* INITIALIZE ROUTES */
const resetRouter = Router();

resetRouter.get('/:email', GET_USER_EMAIL); 
resetRouter.put('/password/:email', VERIFY_TOKEN, RESET_PASSWORD);

export default resetRouter;