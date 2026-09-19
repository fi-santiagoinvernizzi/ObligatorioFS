import { createCategoryService, getCategoriesService } from "../services/category.services.js";

export const createCategoryController = async (req, res, next) => {
    try {
        const category = await createCategoryService(req.body);

        return res.status(201).json(category);
    } catch (error) {
        next(error);
    }
};

export const getCategoriesController = async (req, res, next) => {
    try {
        const categories = await getCategoriesService();

        return res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
};