import {
  type NextFunction,
  type Request,
  type Response,
} from "express";

import User from "../models/user.model.js";

import {type UserRole } from "../models/user.model.js";

export function authorize(
  allowedRoles: UserRole[]
) {
  return async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const user =
        await User.findById(
          request.userId
        );

      if (
        !user ||
        !allowedRoles.includes(
          user.role
        )
      ) {
        return response
          .status(403)
          .json({
            success: false,

            message:
              "Forbidden",
          });
      }

      next();
    } catch {
      return response
        .status(500)
        .json({
          success: false,

          message:
            "Authorization failed",
        });
    }
  };
}