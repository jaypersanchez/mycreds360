import { AuthLayout } from "@/components/layouts";

import { LoginPage, ResetPasswordPage } from "@/pages";

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
    { path: "reset-password", element: <ResetPasswordPage /> },
  ],
};

export default AuthRoutes;
