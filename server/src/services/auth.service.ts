import bcrypt from "bcryptjs";

import User from "../models/user.model.js";

import { generateToken } from "../utils/generateToken.js";
import { AppError } from "../utils/AppError.js";

interface RegisterPayload {
  name: string;

  email: string;

  password: string;
}

interface LoginPayload {
  email: string;

  password: string;
}

export async function registerUser(
  payload: RegisterPayload
) {
  const existingUser =
    await User.findOne({
      email: payload.email,
    });

  if (existingUser) {
    throw new AppError(
      "User already exists",
      400
    );
  }

  const hashedPassword =
    await bcrypt.hash(
      payload.password,
      10
    );

  const user =
    await User.create({
      ...payload,

      password:
        hashedPassword,
    });

  const token =
    generateToken(
      user._id.toString()
    );

  return {
    token,

    user: {
      id: user._id,

      name: user.name,

      email: user.email,

      role: user.role,
    },
  };
}

export async function loginUser(
  payload: LoginPayload
) {
  const user =
    await User.findOne({
      email: payload.email,
    });

  if (!user) {
    throw new AppError(
      "Invalid credentials",
      401
    );
  }

  const isPasswordValid =
    await bcrypt.compare(
      payload.password,
      user.password
    );

  if (!isPasswordValid) {
    throw new AppError(
      "Invalid credentials",
      401
    );
  }

  const token =
    generateToken(
      user._id.toString()
    );

  return {
    token,

    user: {
      id: user._id,

      name: user.name,

      email: user.email,

      role: user.role,
    },
  };
}