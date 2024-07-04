import PropTypes from "prop-types";

import { Button } from "@/components/ui";
import { TextField } from "@/components/forms";

import { DataTableFilter } from "@/components/data-table";

import { Cross2Icon } from "@radix-ui/react-icons";
import { SearchIcon } from "lucide-react";
import Option from "./option";

const Toolbar = ({ table, filter }) => {
  const isFiltered = table.getState().columnFilters.length > 0;
  const isGloballyFiltered = table.getState().globalFilter?.length > 0;

  const shouldResetFilter = isFiltered || isGloballyFiltered;

  return (
    <div className="items-center space-y-2 laptop:flex laptop:flex-1 laptop:space-x-2 laptop:space-y-0">
      <div className="max-w-80">
        <TextField
          placeholder="Search..."
          type="text"
          name="filter-search"
          id="filter-search"
          autoComplete="off"
          value={table.getState().globalFilter ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          icon={{
            left: SearchIcon,
            className: "bottom-[12px] h-4 w-4 text-neutral-400",
          }}
          className={{
            input:
              "py-2 h-10 border-neutral-300 placeholder:text-sm placeholder:italic",
          }}
          noTextHelper
        />
      </div>

      <div className="flex items-center flex-1 space-x-2">
        {Object.keys(filter)?.map((type, index) => {
          return (
            table.getColumn(filter[type].column) &&
            filter[type]?.options && (
              <DataTableFilter
                key={index}
                column={table.getColumn(filter[type].column)}
                title={filter[type]?.title}
                options={filter[type]?.options}
              />
            )
          );
        })}

        {shouldResetFilter && (
          <Button
            variant="ghost"
            onClick={() => {
              if (isGloballyFiltered) {
                table.setGlobalFilter("");
              } else {
                table.resetColumnFilters();
              }
            }}
            className="h-10 bg-transparent hover:bg-secondary/20"
          >
            Reset Filter
            <Cross2Icon className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>

      <div className="flex justify-end">
        <Option table={table} />
      </div>
    </div>
  );
};

Toolbar.propTypes = {
  table: PropTypes.any.isRequired,
  filter: PropTypes.object.isRequired,
};

export default Toolbar;
