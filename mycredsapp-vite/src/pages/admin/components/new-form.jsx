import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { cn } from "@/lib/utils";

import { Button, Switch, WidgetBox } from "@/components/ui";
import { TextField, SelectField } from "@/components/forms";

import CameraIcon from "~icons/custom/camera";

const RoleOptions = [
  { value: "option_1", label: "Option 1" },
  { value: "option_2", label: "Option 2" },
  { value: "option_3", label: "Option 3" },
];

export default function NewForm() {
  const navigate = useNavigate();
  const [previewSrc, setPreviewSrc] = useState(null);

  const validationSchema = Yup.object({
    fullname: Yup.string("Enter user full name").required(
      "Full name is required"
    ),
    email: Yup.string("Enter user email")
      .email("Enter a valid email")
      .required("Email is required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Enter a valid 10 digit mobile number")
      .required("Mobile number is required"),
    role: Yup.string("Select user role").required("Role is required"),
  });

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      role: "",
      image: {},
      status: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log({ values });
      navigate("/admin", { replace: true });
    },
  });

  const handleFieldTouch = (e) => {
    formik.setTouched({ ...formik.touched, [e.target.name]: false });
  };

  const handleMobileInput = (e) => {
    console.log({ ddd: e.target.value.length, d: e.target.value.length < 11 });
    if (e.target.value.length < 11) {
      formik.handleChange(e);
    }
  };

  const handleValueChange = (key, value) => {
    formik.setValues({ ...formik.values, [key]: value });
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.target.files[0];

    if (file) {
      const fileName = file.name;
      const fileType = file.type;
      const fileSize = file.size / 1024 / 1024;
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

      if (!allowedTypes.includes(fileType)) {
        formik.setErrors({
          ...formik.errors,
          image:
            "File type not allowed. Allowed types: .jpeg, .jpg, .png, .gif",
        });
        return;
      }

      if (fileSize > 2) {
        formik.setErrors({ ...formik.errors, image: "File size exceeds 2MB" });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSrc(reader.result);
      };
      reader.readAsDataURL(file);

      formik.setValues({
        ...formik.values,
        image: { fileType, fileSize, file, fileName },
      });
    }
  };

  console.log({ formik });
  return (
    <form
      className="grid grid-cols-1 gap-6 laptop:grid-cols-8"
      onSubmit={formik.handleSubmit}
    >
      <WidgetBox className="flex-col gap-6 laptop:col-span-3">
        <div className="flex flex-col items-center flex-1 gap-3.5">
          <div className="flex flex-col justify-center flex-1 space-y-2.5">
            <div
              className={cn(
                "p-2 mx-auto border-2 border-dashed rounded-full w-36 h-36 group hover:border-neutral-600/40",
                previewSrc
                  ? "border-primary"
                  : formik.errors.image
                  ? "border-red-500"
                  : "border-neutral-600/30"
              )}
            >
              {previewSrc ? (
                <img
                  src={previewSrc}
                  alt="Preview"
                  className="object-cover w-full h-full rounded-full"
                />
              ) : (
                <label
                  htmlFor="image"
                  className={cn(
                    "flex flex-col items-center justify-center w-full h-full text-xs font-semibold leading-6 text-center rounded-full cursor-pointer group-hover:bg-neutral-600/30",
                    formik.errors.image
                      ? "text-red-500 bg-red-600/20 hover:text-primary hover:bg-neutral-600/20"
                      : "text-primary bg-neutral-600/20"
                  )}
                >
                  <CameraIcon
                    className="w-12 h-12 mx-auto"
                    aria-hidden="true"
                  />
                  <span>Upload photo</span>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    accept=".jpeg,.jpg,.png"
                    className="sr-only"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
            {formik.errors.image ? (
              <div className="text-center">
                <p className="text-xs font-medium leading-5 text-red-500">
                  Image not captured
                </p>
                <p className="text-xs font-medium leading-5 text-red-500">
                  {formik.errors.image}
                </p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-xs font-medium leading-5 text-neutral-600">
                  Allowed *.jpeg, *.jpg, *.png
                </p>
                <p className="text-xs font-medium leading-5 text-neutral-600">
                  max size of 2Mb only
                </p>
              </div>
            )}
          </div>
          <div className="flex w-full items-center gap-6 py-2 px-3.5 rounded-lg border border-neutral-300">
            <div className="flex-1 space-y-1">
              <label className="font-semibold text-neutral-900">Status</label>
              <p className="text-xs font-medium">
                Activating status grants admin privileges.
              </p>
            </div>
            <Switch
              name="status"
              id="status"
              checked={formik.values.status}
              onCheckedChange={(value) => handleValueChange("status", value)}
            />
          </div>
        </div>
      </WidgetBox>
      <WidgetBox className="flex-col flex-1 gap-2 laptop:col-span-5">
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
          <TextField
            label="Full name"
            type="text"
            name="fullname"
            id="fullname"
            autoComplete="fullname"
            placeholder="John Doe"
            className={{ input: "h-12" }}
            noFloatingLabel
            required
            value={formik.values.fullname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            onFocus={handleFieldTouch}
            error={
              formik.touched.fullname && Boolean(formik.errors.fullname)
                ? formik.errors.fullname
                : null
            }
          />
          <TextField
            label="Mobile number"
            type="number"
            name="mobile"
            id="mobile"
            autoComplete="mobile"
            placeholder="09123456789"
            className={{ input: "h-12" }}
            noFloatingLabel
            required
            value={formik.values.mobile}
            onChange={handleMobileInput}
            onBlur={formik.handleBlur}
            onFocus={handleFieldTouch}
            error={
              formik.touched.mobile && Boolean(formik.errors.mobile)
                ? formik.errors.mobile
                : null
            }
          />
          <TextField
            label="Email address"
            type="email"
            name="email"
            id="email-address"
            autoComplete="email"
            placeholder="sample@email.com"
            className={{ input: "h-12" }}
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
          <SelectField
            label="Role"
            name="role"
            id="role"
            noFloatingLabel
            required
            placeholder="Select role"
            className={{ trigger: "h-12" }}
            value={formik.values.role}
            onValueChange={(value) => handleValueChange("role", value)}
            options={RoleOptions}
            onBlur={formik.handleBlur}
            onFocus={handleFieldTouch}
            error={
              formik.touched.role && Boolean(formik.errors.role)
                ? formik.errors.role
                : null
            }
          />
        </div>

        <div className="flex mt-auto">
          <Button
            type="submit"
            variant="secondary"
            className="ml-auto font-semibold tracking-wider uppercase bg-primary text-neutral-100 hover:bg-primary/90"
          >
            Create admin
          </Button>
        </div>
      </WidgetBox>
    </form>
  );
}
