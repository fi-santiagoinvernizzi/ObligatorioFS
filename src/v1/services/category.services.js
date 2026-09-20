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

export const getCategoryByIdService = async (id) => {
    const category = await Category.findById(id);

    if (!category) {
        throw constructorError("Categoría no encontrada", 404);
    }

    return category;
};

export const updateCategoryService = async (id, data) => {
    const category = await Category.findById(id);

    if (!category) { throw constructorError("Categoría no encontrada", 404); }

    if (data.name !== undefined) {
        const existingCategory = await Category.findOne({
            name: data.name,
            _id: { $ne: id }
        });

        if (existingCategory) { throw constructorError("La categoría ya existe", 409); }
        category.name = data.name;
    }

    if (data.description !== undefined) {
        category.description = data.description;
    }

    return await category.save();
};