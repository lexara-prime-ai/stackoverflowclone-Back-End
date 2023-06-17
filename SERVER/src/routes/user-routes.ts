import { Router } from "express";
import { getUsers } from "../controllers/user-controller";

/* INITIALIZE ROUTER */
const userRoutes = Router();

userRoutes.get('', getUsers);

export default userRoutes;