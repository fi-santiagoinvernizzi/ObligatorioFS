import { Router } from "express";
import { createCategoryController, getCategoriesController } from "../controller/category.controller.js";
import { validateRequest } from "../middleware/validate.middleware.js";
import { createCategorySchema } from "../schemas/category.schema.js";


const categoryRoutes = Router();

categoryRoutes.post("/",validateRequest(createCategorySchema, "body"), createCategoryController);
categoryRoutes.get("/", getCategoriesController);

export default categoryRoutes;