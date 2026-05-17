import {
  type NextFunction,
  type Request,
  type Response,
} from "express";

import { AppError } from "../utils/AppError.js";

export function errorHandler(
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  if (error instanceof AppError) {
    return response.status(
      error.statusCode
    ).json({
      success: false,

      message:
        error.message,
    });
  }

  return response.status(500).json({
    success: false,

    message:
      "Internal server error",
  });
}