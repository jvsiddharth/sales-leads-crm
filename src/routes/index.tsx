import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";

import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import RegisterPage from "../pages/RegisterPage";

export const router =
  createBrowserRouter([
    {
      path: "/",

      element: (
        <Navigate
          to="/login"
          replace
        />
      ),
    },

    {
      element: <PublicRoute />,

      children: [
        {
          element: <AuthLayout />,

          children: [
            {
              path: "/login",

              element: (
                <LoginPage />
              ),
            },
                {path: "/register",

              element: (
                <RegisterPage />
              ),
                },
          ],
        },
      ],
    },

    {
      element: <ProtectedRoute />,

      children: [
        {
          path: "/dashboard",

          element: (
            <DashboardPage />
          ),
        },
      ],
    },
  ]);