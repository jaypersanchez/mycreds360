import PropTypes from "prop-types";

import {
  Button,
  DropdownMenuContainer,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
} from "@/components/ui";

import { MixerHorizontalIcon } from "@radix-ui/react-icons";

const Option = ({ table }) => {
  const columns = table
    .getAllColumns()
    .filter(
      (column) =>
        typeof column.accessorFn !== "undefined" && column.id !== "action_menu"
    );

  const hasHiddenColumns = columns.some((obj) => !obj.getIsVisible());

  console.log({ columns, ss: table.getAllColumns() });
  return (
    <DropdownMenuContainer>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="px-3 text-sm font-medium bg-transparent border-neutral-300 hover:bg-secondary/20 hover:border-neutral-400"
        >
          <MixerHorizontalIcon className="w-4 h-4 mr-2 stroke-3" />
          Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        {columns.map((column) => {
          return (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="uppercase"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
              disabled={!column.getCanHide()}
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          );
        })}

        {hasHiddenColumns && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="justify-center h-8 p-2"
              onClick={() =>
                columns.forEach((column) => {
                  column.toggleVisibility(true);
                })
              }
            >
              Reset columns
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenuContainer>
  );
};

Option.propTypes = {
  table: PropTypes.any.isRequired,
};

export default Option;
