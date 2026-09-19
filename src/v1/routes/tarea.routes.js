//routes/v1/users.routes.js
import { Router } from "express"
import { createTareaController, deleteTareaController, updateTareaController, getTareasByUserController, replaceTareaController, getTareasController } from "../controller/todo.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validarRolAdminMiddleware } from "../middleware/rol.middleware.js";
import { validateParamsIdTareaMiddleware } from "../middleware/common.middleware.js";
import { sanitizeTaskMiddleware } from "../middleware/sanitize-task.middleware.js";


const tareasRoutes = Router();


tareasRoutes.use(authMiddleware);

//el unico que lo puede ejecutar es el admin
tareasRoutes.get("/admin", validarRolAdminMiddleware, getTareasController);
tareasRoutes.get("/", getTareasByUserController); //obtiene las tareas del usuario logueado
tareasRoutes.post("/", sanitizeTaskMiddleware, createTareaController);
tareasRoutes.delete("/:idTarea", validateParamsIdTareaMiddleware, deleteTareaController);
tareasRoutes.patch("/:idTarea", sanitizeTaskMiddleware, validateParamsIdTareaMiddleware, updateTareaController);
tareasRoutes.put("/:idTarea", sanitizeTaskMiddleware, validateParamsIdTareaMiddleware, replaceTareaController);


export default tareasRoutes

