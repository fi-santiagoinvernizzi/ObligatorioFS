//routes/v1/users.routes.js
import { Router } from "express"
import { createUserController, deleteUserController, replaceUserController, updateUserController, upgradeUserPlanController } 
        from "../controller/user.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js";


const userRoutes = Router();


// userRoutes.use(validateAdminMiddleware);

userRoutes.post("/", createUserController);
userRoutes.delete("/:idUser", deleteUserController);

userRoutes.patch("/me/plan", authMiddleware, upgradeUserPlanController);

userRoutes.patch("/:idUser", updateUserController);
userRoutes.put("/:idUser", replaceUserController);


export default userRoutes
