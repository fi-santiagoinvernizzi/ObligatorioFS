import { constructorError } from "../utils/contructor.error.js";
import { generarAccessTokenByUser } from "../utils/token.util.js";
import { compararPassword, hashear } from "../utils/validar-password.js";
import User from "../models/user.model.js";
import { getUserByEmail, getUserByUsername } from "./user.services.js";
import { Role } from "../constants/role.constants.js";
import { Plans } from "../constants/plans.constants.js";


export const getUserByEmailOrUsername = async (data) => {
    return await User.findOne({
        $or: [
            { email: data },
            { username: data }
        ]
    }).select("+password");
}

//data es un usuario completo
export const createUserService = async (data) => {
    //hay que validar que no existe un usuario con email ni username
    const email = data.email;
    const userPorEmail = await getUserByEmail(email);

    if (userPorEmail) {
        throw constructorError("Error el usuario ya existe", 409);
    }

    const username = data.username;
    const userPorUsername = await getUserByUsername(username);

    if (userPorUsername) {
        throw constructorError("El username ya está registrado", 409);
    }
    //generar pasword encriptado
    const password = data.password;
    const hashPassword = await hashear(password);
    
    //data.password = hashPassword;
    //guardamos y retornamos el usuario
    //const user = await User.create(data);

    const user = await User.create({
        name: data.name,
        username: data.username,
        email: data.email,
        password: hashPassword,
        role: Role.user,
        plan: Plans.plus
    });

    return user;
}

export const generarTokenAuthService = (user) => {
    return generarAccessTokenByUser(user);
}


export const loginService = async (reqBody) => {

    const errorCredencialInvalida = constructorError("Credenciales invalidas", 401);

    if (!reqBody) {
        throw errorCredencialInvalida;
    }
    const emailOUsername = reqBody.identificador;

    //valida que exita usuario en la base, obtener el usuario por el email
    const user = await getUserByEmailOrUsername(emailOUsername);

    //si no existe error
    if (!user) {
        throw errorCredencialInvalida;
    }
    //si existe
    const passwordParam = reqBody.password;
    const passwordBase = user.password;

    //validar password pasado por data con el password del usuario recuperado
    const valid = await compararPassword(passwordParam, passwordBase);

    //si no valida error
    if (!valid) {
        throw errorCredencialInvalida;
    }
    return user;
}



