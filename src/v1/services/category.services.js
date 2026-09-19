import Category from "../models/category.model.js";
import { constructorError } from "../utils/contructor.error.js";

export const createCategoryService = async (data) => {
    const existingCategory = await Category.findOne({ // a ver si ya existe una
        name: data.name
    });

    if (existingCategory) {
        throw constructorError("La categoría ya existe", 409);
    }

    const category = await Category.create({ //si no existe la creo
        name: data.name,
        description: data.description
    });

    return category;
};

export const getCategoriesService = async () => {
    return await Category.find();
};