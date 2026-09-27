import { Role } from "../constants/role.constants.js";
import { constructorError } from "../utils/contructor.error.js";

const validateRolMiddleware = (role) => {
    return (req, res, next) => {
        const usuario = req.user;

        if (!usuario || usuario.role !== role) {
            return next( constructorError( "No tiene permisos suficientes", 403 ) );
        }

        next();
    };
};

export const validarRolAdminMiddleware = validateRolMiddleware(Role.admin);