import { AuthLayout, Page404 } from "@/components/layouts";

import { Outlet } from "react-router-dom";

import {
  LoginPage,
  ResetPasswordPage,
  ResetPasswordSuccess,
  VerifyResetPasswordPage,
} from "@/pages";

const AuthRoutes = {
  id: "auth",
  path: "/auth",
  loader: async () => {
    // await new Promise((r) => setTimeout(r, 1000));
    // check for user if existed in localstorage
    // if existed redirect to "/"
    // if not just return
    const user = "usersad";
    return { auth: user };
  },
  element: <AuthLayout />,
  children: [
    { index: true, element: <LoginPage /> },
    {
      path: "reset-password",
      element: <Outlet />,
      children: [
        { index: true, element: <ResetPasswordPage /> },
        {
          path: "verify",
          element: <VerifyResetPasswordPage />,
        },
        {
          path: "success/reset-request",
          element: <ResetPasswordSuccess />,
        },
        {
          path: "success/password-change",
          element: <ResetPasswordSuccess />,
        },
      ],
    },
  ],
};

export default AuthRoutes;
