import mongoose from "mongoose";
import { Role, Roles } from "../constants/role.constants.js";
import { Plans, Planes } from "../constants/plans.constants.js";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    role: { 
        type: String, 
        enum: Roles, 
        default: Role.user 
    },
    plan: {
        type: String,
        enum: Plans,
        default: Plans.plus,
    },
    password: {
        type: String,
        required: true,
        select: false
    }
});

userSchema.set('toJSON', {
    //doc es el documento de mongoose y ret el elemento a devolver
    transform: (doc, ret) => {
        // renombrar _id → id
        ret.id = ret._id;
        //borramos el id de mongo
        delete ret._id;
        delete ret.password;
        // // eliminar campos que no querés exponer
        // 
        delete ret.__v;
        // delete ret.createdAt;
        // delete ret.updatedAt;
        return ret;
    }
});

const User = mongoose.model("User", userSchema);

export default User;






