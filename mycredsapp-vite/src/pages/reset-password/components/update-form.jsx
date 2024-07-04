import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui";
import { TextField } from "@/components/forms";

import EyeIcon from "~icons/custom/eye";
import EyeOffIcon from "~icons/custom/eyeoff";

export default function UpdateForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object({
    password: Yup.string("Enter your new password").required(
      "New Password is required"
    ),
    confirm_password: Yup.string("Enter your confirm password")
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log({ values });
      navigate("/auth/reset-password/success/password-change", {
        replace: true,
      });
    },
  });

  const handleFieldTouch = (e) => {
    formik.setTouched({ ...formik.touched, [e.target.name]: false });
  };

  return (
    <form className="space-y-4" onSubmit={formik.handleSubmit}>
      <div className="space-y-3">
        <TextField
          label="New Password"
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

        <TextField
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          name="confirm_password"
          id="confirm_password"
          autoComplete="off"
          noFloatingLabel
          password
          required
          icon={{
            right: showConfirmPassword ? EyeOffIcon : EyeIcon,
            onClick: () => setShowConfirmPassword(!showConfirmPassword),
            className: cn(showConfirmPassword && "inset-y-12"),
          }}
          value={formik.values.confirm_password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          onFocus={handleFieldTouch}
          error={
            formik.touched.confirm_password &&
            Boolean(formik.errors.confirm_password)
              ? formik.errors.confirm_password
              : null
          }
        />
      </div>

      <Button
        type="submit"
        variant="secondary"
        className="w-full h-12 ml-auto text-lg font-semibold tracking-wider uppercase bg-primary text-neutral-100 hover:bg-primary/90"
      >
        Reset Password
      </Button>
    </form>
  );
}
