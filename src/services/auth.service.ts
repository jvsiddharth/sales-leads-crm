import api from "../lib/api";

import {
  type LoginPayload,
  type RegisterPayload,
} from "../types/auth.types";

export async function login(
  payload: LoginPayload
) {
  const response =
    await api.post(
      "/auth/login",
      payload
    );

  return response.data.data;
}

export async function register(
  payload: RegisterPayload
) {
  const response =
    await api.post(
      "/auth/register",
      payload
    );

  return response.data.data;
}