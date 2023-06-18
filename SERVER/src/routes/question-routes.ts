import { Router } from "express";
import {  } from "../controllers/user-controller";

/* INITIALIZE ROUTER */
const questionRoutes = Router();

questionRoutes.get('', getQuestions);
questionRoutes.get('/:question_id', getQuestionById);
questionRoutes.post('', addQuestion);
questionRoutes.put('/:question_id', updateQuestion);
questionRoutes.delete('/:question_id', deleteQuestion);

export default questionRoutes; 