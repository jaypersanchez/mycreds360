import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  DropdownMenuContainer,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";

import {
  EllipsisVerticalIcon,
  EyeIcon,
  FilePenLineIcon,
  Trash2Icon,
  UserRoundCogIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function TableActions({ row }) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div
      className={cn(
        "flex items-center flex-1 gap-x-1",
        "[td:has(>_&)]:w-[70px]"
      )}
    >
      <DropdownMenuContainer>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="w-7 h-7 data-[state=open]:border data-[state=open]:border-neutral-300"
          >
            <EllipsisVerticalIcon className="w-full h-full p-1.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px]">
          <DropdownMenuItem
            className="gap-2 text-xs font-semibold uppercase"
            onClick={() =>
              navigate(`view/${row.getValue("id")}`, {
                state: { prevPath: location.pathname },
              })
            }
          >
            <EyeIcon className="w-4 h-4" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem
            className="gap-2 text-xs font-semibold uppercase"
            onClick={() =>
              navigate(`edit/${row.getValue("id")}`, {
                state: { prevPath: location.pathname },
              })
            }
          >
            <FilePenLineIcon className="w-4 h-4" />
            Update
          </DropdownMenuItem>

          <DropdownMenuItem
            className="gap-2 text-xs font-semibold uppercase"
            onClick={() => console.log({ asdas: row })}
          >
            <UserRoundCogIcon className="w-4 h-4" />
            Assign Role
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="gap-2 text-xs font-semibold text-red-600 uppercase focus:text-red-600"
            onClick={() => console.log({ asdas: row })}
          >
            <Trash2Icon className="w-4 h-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuContainer>
    </div>
  );
}
