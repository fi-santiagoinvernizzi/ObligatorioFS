import { Router } from "express";
import { sanitizeMovieMiddleware } from "../middleware/sanitize.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validateRequest } from "../middleware/validate.middleware.js";

import { createMovieController, getMoviesController, getMovieByIdController, updateMovieController, replaceMovieController,
         deleteMovieController }from "../controller/movie.controller.js";

import { createMovieSchema, movieIdParamsSchema, updateMovieSchema, replaceMovieSchema } from "../schemas/movie.schema.js";

const movieRoutes = Router();

movieRoutes.get("/", authMiddleware, getMoviesController);
movieRoutes.get("/:idMovie", authMiddleware, validateRequest(movieIdParamsSchema, "params"), getMovieByIdController);
movieRoutes.post("/", authMiddleware, sanitizeMovieMiddleware, validateRequest(createMovieSchema, "body"), createMovieController);
movieRoutes.patch("/:idMovie", authMiddleware, sanitizeMovieMiddleware , validateRequest(movieIdParamsSchema, "params"), 
                    validateRequest(updateMovieSchema, "body"), updateMovieController);
movieRoutes.put("/:idMovie", authMiddleware, sanitizeMovieMiddleware, validateRequest(movieIdParamsSchema, "params"), 
                validateRequest(replaceMovieSchema, "body"), replaceMovieController);
movieRoutes.delete( "/:idMovie", authMiddleware, validateRequest(movieIdParamsSchema, "params"), deleteMovieController);

export default movieRoutes;