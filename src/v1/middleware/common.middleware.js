import { paramsIdTareaSchema } from "../schemas/common.schema.js";
import { validateRequest } from "./validate.middleware.js";



export const validateParamsIdTareaMiddleware = validateRequest(paramsIdTareaSchema, "params");

