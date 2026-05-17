import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import { AppError } from "../utils/AppError.js";
export async function registerUser(payload) {
    const existingUser = await User.findOne({
        email: payload.email,
    });
    if (existingUser) {
        throw new AppError("User already exists", 400);
    }
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const user = await User.create({
        ...payload,
        password: hashedPassword,
    });
    const token = generateToken(user._id.toString());
    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
}
export async function loginUser(payload) {
    const user = await User.findOne({
        email: payload.email,
    });
    if (!user) {
        throw new AppError("Invalid credentials", 401);
    }
    const isPasswordValid = await bcrypt.compare(payload.password, user.password);
    if (!isPasswordValid) {
        throw new AppError("Invalid credentials", 401);
    }
    const token = generateToken(user._id.toString());
    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
}
//# sourceMappingURL=auth.service.js.map