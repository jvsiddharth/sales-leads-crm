import { type NextFunction, type Request, type Response } from "express";
export declare function asyncHandler(controller: (request: Request, response: Response, next: NextFunction) => Promise<unknown>): (request: Request, response: Response, next: NextFunction) => void;
//# sourceMappingURL=asyncHandler.d.ts.map