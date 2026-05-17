import {
  type NextFunction,
  type Request,
  type Response,
} from "express";

import type { ZodSchema } from "zod";

export function validate(
  schema: ZodSchema
) {
  return (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      schema.parse(
        request.body
      );

      next();
    } catch (error: unknown) {
      return response
        .status(400)
        .json({
          success: false,

          message:
            "Validation failed",

          error,
        });
    }
  };
}