import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui";

import SuccessIcon from "~icons/custom/success";

export default function ResetPasswordSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentLocation = location.pathname.split("/").slice(-1).toString();
  const isPasswordChanged = currentLocation === "password-change";

  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-full p-0">
      <SuccessIcon className="w-48 h-48 mb-1 text-green-600" />
      <div className="w-full max-w-md">
        <h2 className="text-4xl font-bold leading-9 tracking-tight text-center text-primary">
          {isPasswordChanged ? "Password Changed!" : "Reset Requested"}
        </h2>
        <p className="mt-2 text-sm font-medium tracking-tight text-center text-neutral-500">
          {isPasswordChanged
            ? "Awesome, you've succefully updated your password. You can now sign in with your new password."
            : "An email has been sent to your address with instructions on how to reset your password. Please check your inbox and follow the steps to complete the process."}
        </p>
      </div>

      <div className="w-full max-w-md mt-12 space-y-8">
        <Button
          variant="secondary"
          className="w-full h-12 ml-auto text-lg font-semibold tracking-wider uppercase bg-primary text-neutral-100 hover:bg-primary/90"
          onClick={() => navigate("/auth", { replace: true })}
        >
          {isPasswordChanged ? "Sign in" : "Go Back"}
        </Button>
      </div>
    </div>
  );
}
