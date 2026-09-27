import Joi from 'joi';
import { Roles } from "../constants/role.constants.js";

//esquema de validacion para body registro
export const registerBodySchema = Joi.object({
    name: Joi.string()
             .min(3)
             .max(30)
             .label("nombre")
             .required(),

    username: Joi.string()
                 .alphanum()
                 .min(3)
                 .max(30)
                 .trim()
                 .required(),

    email: Joi.string()
              .email()
              .trim()
              .lowercase()
              .required(),

    password: Joi.string()
                 .min(3)
                 .max(30)
                 .required(),
                 
    confirmPassword: Joi.string()
                        .valid(Joi.ref("password"))
                        .required()
                        .messages({"any.only": "Las contraseñas no coinciden"}),
})

export const createUserSchema = registerBodySchema.keys({
    role: Joi.string()
        .valid(...Roles)
        .required()
});

//validar el rol de la persona en el body sea valido por ejemplo
export const roleSchema = Joi.object({
    role: Joi.string().required()
})

