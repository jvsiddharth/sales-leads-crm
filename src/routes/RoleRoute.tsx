import {
  Navigate,
  Outlet,
} from "react-router-dom";

import { type UserRole } from "../types/auth.types";

import { useAuthStore } from "../store/auth.store";

interface RoleRouteProps {
  allowedRoles: UserRole[];
}

export default function RoleRoute({
  allowedRoles,
}: RoleRouteProps) {
  const { user } =
    useAuthStore();

  if (
    !user ||
    !allowedRoles.includes(
      user.role
    )
  ) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return <Outlet />;
}