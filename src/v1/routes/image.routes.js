
import { Router } from "express";
import { subirImagenController } from "../controller/image.controller.js";

const imageRoutes = Router();

imageRoutes.post("/", subirImagenController);

export default imageRoutes;
