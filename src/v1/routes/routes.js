
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import categoryRoutes from "./category.routes.js";
import movieRoutes from "./movie.routes.js";

const v1Routes = Router()

v1Routes.use("/auth", authRoutes);
v1Routes.use("/users", userRoutes);
v1Routes.use("/categories", categoryRoutes);
v1Routes.use("/movies", movieRoutes);

export default v1Routes

