import React from "react";
import { useParams } from "react-router-dom";

import { PageHeader } from "@/components/headers";
import EditForm from "../components/edit-form";

export default function Edit() {
  const { id } = useParams();

  console.log({ id });
  return (
    <div className="w-full mx-auto space-y-12 max-w-screen-laptop">
      <PageHeader title="Edit Admin Account" canGoBack />

      <EditForm />
    </div>
  );
}
