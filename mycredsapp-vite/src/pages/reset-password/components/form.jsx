import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Button, TextField } from "@/components/ui";

export default function Form() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log({ values });
      navigate("/auth/reset-password/success/reset-link", { replace: true });
    },
  });

  const handleFieldTouch = (e) => {
    formik.setTouched({ ...formik.touched, [e.target.name]: false });
  };

  return (
    <form className="space-y-4" onSubmit={formik.handleSubmit}>
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

      <Button
        type="submit"
        variant="secondary"
        className="w-full h-12 ml-auto text-lg font-semibold tracking-wider uppercase bg-primary text-neutral-100 hover:bg-primary/90"
      >
        Email Recovery Link
      </Button>
    </form>
  );
}
