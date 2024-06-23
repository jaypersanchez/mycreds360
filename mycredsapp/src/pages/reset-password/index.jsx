export default function ResetPassword() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-full p-0">
      <div className="w-full max-w-md">
        <h2 className="text-5xl font-bold leading-9 tracking-tight text-center text-primary laptop:text-start">
          Reset Password
        </h2>
        <p className="mt-2 text-sm font-medium tracking-tight text-center laptop:text-start text-neutral-500">
          Can’t access your Account? No worries! Enter your email address below
          and we’ll send you a reset link.
        </p>
      </div>

      <div className="w-full max-w-md mt-6 space-y-8">{/* <Form /> */}</div>
    </div>
  );
}
