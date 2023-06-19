import { Router } from 'express';
import { getCommentById, getComments } from '../controllers/comment-controller';

/* INITIALIZE ROUTER */
const commentRoutes = Router();

commentRoutes.get('', getComments);
commentRoutes.get('/:comment_id', getCommentById);

export default commentRoutes;
