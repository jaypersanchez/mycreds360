import { Divider } from "@/components/ui";

import SingleSignin from "./components/single-signin";
import Form from "./components/form";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-full p-0">
      <div className="w-full max-w-md">
        <h2 className="text-4xl font-bold leading-9 tracking-tight text-center text-primary laptop:text-start">
          Welcome back!
        </h2>
        <p className="font-medium leading-7 mt-0.5 tracking-tight text-center laptop:text-start text-neutral-500">
          Sign in to your account
        </p>
      </div>

      <div className="w-full max-w-md mt-6 space-y-8">
        <SingleSignin />
        <Divider label="OR CONTINUE WITH" />
        <Form />
      </div>
    </div>
  );
}
