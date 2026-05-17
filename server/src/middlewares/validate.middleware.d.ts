import { type NextFunction, type Request, type Response } from "express";
import type { ZodSchema } from "zod";
export declare function validate(schema: ZodSchema): (request: Request, response: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=validate.middleware.d.ts.map