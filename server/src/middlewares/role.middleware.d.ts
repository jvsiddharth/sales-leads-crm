import { type NextFunction, type Request, type Response } from "express";
import { type UserRole } from "../models/user.model.js";
export declare function authorize(allowedRoles: UserRole[]): (request: Request, response: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=role.middleware.d.ts.map