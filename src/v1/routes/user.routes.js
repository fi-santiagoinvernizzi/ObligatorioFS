import { Router } from "express";
import { createUserController, upgradeUserPlanController } from "../controller/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validarRolAdminMiddleware } from "../middleware/rol.middleware.js";
import { validateRequest } from "../middleware/validate.middleware.js";
import { createUserSchema } from "../schemas/register-body.schema.js";

const userRoutes = Router();

userRoutes.post( "/", authMiddleware, validarRolAdminMiddleware, validateRequest(createUserSchema, "body"), 
        createUserController);

userRoutes.patch( "/me/plan", authMiddleware, upgradeUserPlanController );

export default userRoutes;