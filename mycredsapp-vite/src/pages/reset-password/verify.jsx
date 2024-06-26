import UpdateForm from "./components/update-form";

export default function VerifyResetPassword() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-full p-0">
      <div className="w-full max-w-md">
        <h2 className="text-4xl font-bold leading-9 tracking-tight text-center text-primary laptop:text-start">
          Create New Password
        </h2>
        <p className="mt-2 text-sm font-medium tracking-tight text-center laptop:text-start text-neutral-500">
          Your new password must be different from used password.
        </p>
      </div>

      <div className="w-full max-w-md mt-6 space-y-8">
        <UpdateForm />
      </div>
    </div>
  );
}
