import { Router } from "express";
import { SIGN_UP_USER } from "../controllers/mailer";

/* INITIALIZE ROUTES */
const signUpRouter = Router();

signUpRouter.post('', SIGN_UP_USER);

export default signUpRouter;