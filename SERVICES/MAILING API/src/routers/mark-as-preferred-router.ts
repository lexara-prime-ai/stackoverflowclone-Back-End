import { Router } from "express";
import { MARK_AS_PREFERRED } from "../controllers/mailer";

/* INITIALIZE ROUTES */
const markAsPreferredRouter = Router();

markAsPreferredRouter.post('/:answer_id', MARK_AS_PREFERRED);

export default markAsPreferredRouter;