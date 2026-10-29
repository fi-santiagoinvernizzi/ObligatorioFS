import { Router } from "express";
import { subirImagenController } from "../controller/image.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const imageRoutes = Router();

imageRoutes.post("/", authMiddleware, subirImagenController);

export default imageRoutes;