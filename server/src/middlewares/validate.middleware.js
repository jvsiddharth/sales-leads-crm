import {} from "express";
export function validate(schema) {
    return (request, response, next) => {
        try {
            schema.parse(request.body);
            next();
        }
        catch (error) {
            return response
                .status(400)
                .json({
                success: false,
                message: "Validation failed",
                error,
            });
        }
    };
}
//# sourceMappingURL=validate.middleware.js.map