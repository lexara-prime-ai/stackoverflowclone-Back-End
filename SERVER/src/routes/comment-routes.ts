import { Router } from 'express';
import { addComment, deleteComment, getCommentById, getComments, updateComment } from '../controllers/comment-controller';

/* INITIALIZE ROUTER */
const commentRoutes = Router();

commentRoutes.get('', getComments);
commentRoutes.get('/:comment_id', getCommentById);
commentRoutes.post('', addComment);
commentRoutes.put('/:comment_id', updateComment);
commentRoutes.delete('/:comment_id', deleteComment);

export default commentRoutes;
