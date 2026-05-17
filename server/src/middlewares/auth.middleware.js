import {} from "express";
import jwt from "jsonwebtoken";
export function protect(request, response, next) {
    try {
        const authHeader = request.headers.authorization;
        if (!authHeader ||
            !authHeader.startsWith("Bearer ")) {
            return response
                .status(401)
                .json({
                success: false,
                message: "Unauthorized",
            });
        }
        const token = authHeader.split(" ")[1];
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return response
                .status(500)
                .json({
                success: false,
                message: "Server error",
            });
        }
        const decoded = jwt.verify(token, jwtSecret);
        request.userId =
            decoded.userId;
        next();
    }
    catch {
        return response
            .status(401)
            .json({
            success: false,
            message: "Invalid token",
        });
    }
}
//# sourceMappingURL=auth.middleware.js.map