import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { cn } from "@/lib/utils";

import { Button, TextField } from "@/components/ui";

import EyeIcon from "~icons/custom/eye";
import EyeOffIcon from "~icons/custom/eyeoff";

export default function Form() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string("Enter your password").required(
      "Password is required"
    ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log({ values });
      navigate("/", { replace: true });
    },
  });

  const handleFieldTouch = (e) => {
    formik.setTouched({ ...formik.touched, [e.target.name]: false });
  };

  return (
    <form className="space-y-4" onSubmit={formik.handleSubmit}>
      <div className="space-y-3">
        <TextField
          label="Email Address"
          type="email"
          name="email"
          id="email-address"
          autoComplete="email"
          noFloatingLabel
          required
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          onFocus={handleFieldTouch}
          error={
            formik.touched.email && Boolean(formik.errors.email)
              ? formik.errors.email
              : null
          }
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          autoComplete="off"
          noFloatingLabel
          password
          required
          icon={{
            right: showPassword ? EyeOffIcon : EyeIcon,
            onClick: () => setShowPassword(!showPassword),
            className: cn(showPassword && "inset-y-12"),
          }}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          onFocus={handleFieldTouch}
          error={
            formik.touched.password && Boolean(formik.errors.password)
              ? formik.errors.password
              : null
          }
        />
      </div>

      <div className="flex flex-col items-center mobile:flex-row gap-y-6">
        <div className="flex items-center order-last space-x-2 mobile:order-first">
          <Link
            to="reset-password"
            className="text-sm font-medium leading-none tracking-wide text-neutral-500 hover:underline underline-offset-4"
          >
            Forgot your password?
          </Link>
        </div>
        <Button
          type="submit"
          variant="secondary"
          className="w-full h-12 ml-auto text-lg font-semibold tracking-wider uppercase bg-primary mobile:w-1/3 text-neutral-100 hover:bg-primary/90"
        >
          Sign in
        </Button>
      </div>
    </form>
  );
}
