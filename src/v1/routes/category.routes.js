import { Router } from "express";
import { createCategoryController, getCategoriesController, getCategoryByIdController, updateCategoryController } 
        from "../controller/category.controller.js";
import { validateRequest } from "../middleware/validate.middleware.js";
import { createCategorySchema, categoryIdParamsSchema, updateCategorySchema } from "../schemas/category.schema.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validarRolAdminMiddleware } from "../middleware/rol.middleware.js";

const categoryRoutes = Router();

categoryRoutes.post("/", authMiddleware, validarRolAdminMiddleware, validateRequest(createCategorySchema, "body"), createCategoryController);
categoryRoutes.get("/", getCategoriesController);
categoryRoutes.get("/:idCategory", validateRequest(categoryIdParamsSchema, "params"), getCategoryByIdController);
categoryRoutes.patch("/:idCategory",  authMiddleware, validarRolAdminMiddleware, validateRequest(categoryIdParamsSchema, "params"), 
                        validateRequest(updateCategorySchema, "body"), updateCategoryController);

export default categoryRoutes;