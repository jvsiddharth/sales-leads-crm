import {
  type NextFunction,
  type Request,
  type Response,
} from "express";

import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
}

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export function protect(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const authHeader =
      request.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith(
        "Bearer "
      )
    ) {
      return response
        .status(401)
        .json({
          success: false,

          message:
            "Unauthorized",
        });
    }

    const token =
      authHeader.split(
        " "
      )[1];

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return response
        .status(500)
        .json({
          success: false,
          message: "Server error",
        });
    }

    const decoded = jwt.verify(
      token as string,
      jwtSecret as string
    ) as unknown as JwtPayload;

    request.userId =
      decoded.userId;

    next();
  } catch {
    return response
      .status(401)
      .json({
        success: false,

        message:
          "Invalid token",
      });
  }
}