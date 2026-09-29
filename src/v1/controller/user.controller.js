import { upgradeUserPlanService } from "../services/user.services.js";

export const upgradeUserPlanController = async (req, res, next) => {
    try {
        const user = await upgradeUserPlanService(req.user.id);
        return res.status(200).json(user);

    } catch (error) {
        next(error)
    }
};