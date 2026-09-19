//routes/v1/users.routes.js
import { Router } from "express"
import { createUserController, deleteUserController, replaceUserController, updateUserController } from "../controller/user.controller.js"



const userRoutes = Router();


// userRoutes.use(validateAdminMiddleware);

userRoutes.post("/", createUserController);
userRoutes.delete("/:idUser", deleteUserController);


userRoutes.patch("/:idUser", updateUserController);
userRoutes.put("/:idUser", replaceUserController);


export default userRoutes
