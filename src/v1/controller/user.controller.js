import { createUserService } from "../services/auth.service.js";
import { upgradeUserPlanService } from "../services/user.services.js";

export const createUserController = async (req, res) => {
    try {   
        const data = req.body;
        const user = await createUserService(data);
        return res.status(201).json(user);

    } catch (error) {
        next(error)
    }
}

export const upgradeUserPlanController = async (req, res) => {
    try {
        const user = await upgradeUserPlanService(req.user.id);
        return res.status(200).json(user);

    } catch (error) {
        next(error)
    }
};