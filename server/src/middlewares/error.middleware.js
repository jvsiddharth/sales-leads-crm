import {} from "express";
import { AppError } from "../utils/AppError.js";
export function errorHandler(error, _request, response, _next) {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            success: false,
            message: error.message,
        });
    }
    return response.status(500).json({
        success: false,
        message: "Internal server error",
    });
}
//# sourceMappingURL=error.middleware.js.map