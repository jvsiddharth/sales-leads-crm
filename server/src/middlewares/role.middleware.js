import {} from "express";
import User from "../models/user.model.js";
import {} from "../models/user.model.js";
export function authorize(allowedRoles) {
    return async (request, response, next) => {
        try {
            const user = await User.findById(request.userId);
            if (!user ||
                !allowedRoles.includes(user.role)) {
                return response
                    .status(403)
                    .json({
                    success: false,
                    message: "Forbidden",
                });
            }
            next();
        }
        catch {
            return response
                .status(500)
                .json({
                success: false,
                message: "Authorization failed",
            });
        }
    };
}
//# sourceMappingURL=role.middleware.js.map