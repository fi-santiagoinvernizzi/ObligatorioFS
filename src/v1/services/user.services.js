import User from "../models/user.model.js";
import { Plans } from "../constants/plans.constants.js";
import { constructorError } from "../utils/contructor.error.js";

//obtener usuario por email
export const getUserByEmail = async (data) => {
    return await User.findOne({ email: data });
}

//obtener usuario por username
export const getUserByUsername = async (data) => {
    return await User.findOne({ username: data });
}

export const upgradeUserPlanService = async (id) => {
    const user = await User.findById(id);

    if (!user) {
        throw constructorError("Usuario no encontrado", 404);
    }

    if (user.plan === Plans.premium) {
        throw constructorError("El usuario ya tiene el plan premium", 409);
    }

    user.plan = Plans.premium;

    return await user.save();
};

