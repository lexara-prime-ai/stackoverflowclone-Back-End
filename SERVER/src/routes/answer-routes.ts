import { Router } from "express";
import { addAnswer, deleteAnswer, getAnswerById, getAnswers, updateAnswer } from "../controllers/answer-controller";

/* INITIALIZE ROUTE */
const answerRoutes = Router();

answerRoutes.get('', getAnswers);
answerRoutes.get('/:answer_id', getAnswerById);
answerRoutes.post('', addAnswer);
answerRoutes.put('/:answer_id', updateAnswer);
answerRoutes.delete('/:answer_id', deleteAnswer);

export default answerRoutes;