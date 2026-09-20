import Joi from "joi";

export const createMovieSchema = Joi.object({
    title: Joi.string()
        .trim()
        .min(1)
        .max(150)
        .required(),

    description: Joi.string()
        .trim()
        .min(1)
        .max(1000)
        .required(),

    releaseYear: Joi.number()
        .integer()
        .min(1888) //año peli mas vieja
        .max(new Date().getFullYear()) //no posterior a actual
        .required(),

    category: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/) //id de mongo de la categoria
        .required()
        .messages({
            "string.pattern.base": "El ID de la categoría no es válido"
        })
});

export const movieIdParamsSchema = Joi.object({
    idMovie: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
            "string.pattern.base": "El ID de la película no es válido"
        })
});

export const updateMovieSchema = Joi.object({
    title: Joi.string().trim().min(1).max(150),
    description: Joi.string().trim().min(1).max(1000),
    releaseYear: Joi.number()
        .integer()
        .min(1888)
        .max(new Date().getFullYear()),
    category: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .messages({
            "string.pattern.base": "El ID de la categoría no es válido"
        })
}).min(1).required();

export const replaceMovieSchema = Joi.object({
    title: Joi.string().trim().min(1).max(150).required(),
    description: Joi.string().trim().min(1).max(1000).required(),
    releaseYear: Joi.number()
        .integer()
        .min(1888)
        .max(new Date().getFullYear())
        .required(),
    category: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
            "string.pattern.base": "El ID de la categoría no es válido"
        })
});