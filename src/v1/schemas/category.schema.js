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