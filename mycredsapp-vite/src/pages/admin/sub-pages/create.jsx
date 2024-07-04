import React from "react";

import { PageHeader } from "@/components/headers";
import NewForm from "../components/new-form";

export default function Create() {
  return (
    <div className="w-full mx-auto space-y-12 max-w-screen-laptop">
      <PageHeader title="Create a new admin" canGoBack />

      <NewForm />
    </div>
  );
}
