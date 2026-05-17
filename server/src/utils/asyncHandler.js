import {} from "express";
export function asyncHandler(controller) {
    return (request, response, next) => {
        Promise.resolve(controller(request, response, next)).catch(next);
    };
}
//# sourceMappingURL=asyncHandler.js.map