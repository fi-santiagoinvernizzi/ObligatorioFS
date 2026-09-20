import Joi from "joi";

export const createCategorySchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(1)
        .max(50)
        .required(),

    description: Joi.string()
        .trim()
        .min(1)
        .max(255)
        .required()
});

export const categoryIdParamsSchema = Joi.object({
    idCategory: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
            "string.pattern.base": "El ID de la categoría no es válido"
        })
});

export const updateCategorySchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(1)
        .max(50),

    description: Joi.string()
        .trim()
        .min(1)
        .max(255)
}).min(1).required;