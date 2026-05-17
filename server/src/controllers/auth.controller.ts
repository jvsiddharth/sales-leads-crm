import {
  type Request,
  type Response,
} from "express";

import {
  loginUser,
  registerUser,
} from "../services/auth.service.js";

import { asyncHandler } from "../utils/asyncHandler.js";

export const register =
  asyncHandler(
    async (
      request: Request,
      response: Response
    ) => {
      const data =
        await registerUser(
          request.body
        );

      response.status(201).json({
        success: true,

        message:
          "User registered successfully",

        data,
      });
    }
  );

export const login =
  asyncHandler(
    async (
      request: Request,
      response: Response
    ) => {
      const data =
        await loginUser(
          request.body
        );

      response.status(200).json({
        success: true,

        message:
          "Login successful",

        data,
      });
    }
  );