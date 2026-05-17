export class AppError extends Error {
    statusCode;
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode =
            statusCode;
    }
}
//# sourceMappingURL=AppError.js.map