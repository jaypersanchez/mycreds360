import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { PageHeader } from "@/components/headers";
import { Button, WidgetBox } from "@/components/ui";
import { DataTable } from "@/components/data-table";
import { FlexBetween } from "@/components/flexbox";

import { PlusIcon } from "lucide-react";

import { columns } from "../components/columns";
import data from "../components/data.json";
import { roles, statuses } from "../components/schema";

export default function List() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-full space-y-12">
      <FlexBetween className="items-start">
        <PageHeader title="Admin" className="flex-1" />
        <Button
          size="lg"
          className="gap-1.5 pr-5"
          onClick={() =>
            navigate("create", { state: { prevPath: location.pathname } })
          }
        >
          <PlusIcon className="w-5 h-5" />
          New admin
        </Button>
      </FlexBetween>

      <WidgetBox>
        <DataTable
          data={data}
          columns={columns}
          filter={{
            roles: {
              column: "role",
              title: "Role",
              options: roles,
            },
            statuses: {
              column: "isActive",
              title: "Status",
              options: statuses,
            },
          }}
        />
      </WidgetBox>
    </div>
  );
}
