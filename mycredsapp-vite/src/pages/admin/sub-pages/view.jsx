import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { PageHeader } from "@/components/headers";
import { FlexBetween } from "@/components/flexbox";
import { Button } from "@/components/ui";
import { FilePenIcon } from "lucide-react";

export default function View() {
  const navigate = useNavigate();
  const { id } = useParams();

  console.log({ id });
  return (
    <div className="w-full mx-auto space-y-12 max-w-screen-laptop">
      <FlexBetween className="items-start">
        <PageHeader title="Admin Profile" className="flex-1" canGoBack />
        <Button
          size="lg"
          className="gap-1.5 pr-5"
          onClick={() => navigate(`/admin/edit/${id}`)}
        >
          <FilePenIcon className="w-5 h-5" />
          Edit Profile
        </Button>
      </FlexBetween>
    </div>
  );
}
