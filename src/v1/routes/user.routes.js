import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {upgradeUserPlanController} from "../controller/user.controller.js"

const userRoutes = Router();

userRoutes.patch( "/me/plan", authMiddleware, upgradeUserPlanController );

export default userRoutes;