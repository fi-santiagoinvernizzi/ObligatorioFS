import { createCategoryService, getCategoriesService, getCategoryByIdService, updateCategoryService } from "../services/category.services.js";

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

export const getCategoryByIdController = async (req, res, next) => {
    try {
        const category = await getCategoryByIdService(req.params.idCategory);
        return res.status(200).json(category);

    } catch (error) {
        next(error);
    }
};

export const updateCategoryController = async (req, res, next) => {
    try {
        const category = await updateCategoryService(
            req.params.idCategory,
            req.body
        );
        return res.status(200).json(category);
        
    } catch (error) {
        next(error);
    }
};
