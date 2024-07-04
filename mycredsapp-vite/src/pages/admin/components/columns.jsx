import { DataTableHeader } from "@/components/data-table";

import TableActions from "./table-actions";
import { cn } from "@/lib/utils";

export const columns = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableHeader
        column={column}
        title="ID #"
        className="h-full py-3 border-b border-neutral-300"
      />
    ),
    cell: ({ row }) => (
      <div className="flex items-center flex-1 min-w-[95px] px-2">
        {row.getValue("id")}
      </div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "fullname",
    header: ({ column }) => (
      <DataTableHeader
        column={column}
        title="Name"
        className="h-full py-3 border-b border-neutral-300"
      />
    ),
    cell: ({ row }) => {
      console.log({ row });
      return (
        <div className="flex flex-col justify-center flex-1 min-w-[250px] px-2">
          <p className="font-medium uppercase">{row.getValue("fullname")}</p>
          <p className="text-xs font-semibold text-secondary">
            {row.original.email}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableHeader
        column={column}
        title="Role"
        className="h-full py-3 border-b border-neutral-300"
      />
    ),
    cell: ({ row }) => (
      <div className="flex items-center flex-1 min-w-[245px] flex-wrap px-2 gap-1">
        {Array.from({ length: Math.floor(Math.random() * 8) + 1 }).map(
          (_, index) => (
            <div
              key={index}
              className={cn(
                "px-2 text-center py-[1px] h-5 leading-none text-[10px] rounded-md font-medium uppercase bg-secondary text-white"
              )}
            >
              {row.getValue("role")}
            </div>
          )
        )}
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <DataTableHeader
        column={column}
        title="Status"
        className="h-full py-3 border-b border-neutral-300 min-w-[150px] max-w-[150px] [td:has(>_&)]:w-[150px]"
      />
    ),
    cell: ({ row }) => (
      <div className="flex items-center flex-1 px-2 [td:has(>_&)]:w-[150px]">
        <div
          className={cn(
            "w-20 px-1 text-center py-1.5 text-xs rounded-md font-semibold uppercase",
            row.getValue("isActive")
              ? "bg-green-500/40 text-green-800"
              : "bg-red-500/40 text-red-700"
          )}
        >
          {row.getValue("isActive") ? "Active" : "Inactive"}
        </div>
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "action_menu",
    header: ({ column }) => (
      <DataTableHeader
        column={column}
        className="h-full py-3 border-b border-neutral-300 min-w-[70px] max-w-[70px] [td:has(>_&)]:w-[70px]"
      />
    ),
    cell: ({ row }) => <TableActions row={row} />,
    enableHiding: false,
    enableSorting: false,
  },
];
