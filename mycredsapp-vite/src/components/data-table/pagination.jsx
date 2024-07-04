import PropTypes from "prop-types";
import {
  Button,
  SelectContainer,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";

import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

const Pagination = ({ table }) => {
  const pageSizeOptions = [5, 10, 25, 50];

  return (
    <div className="flex flex-col-reverse items-center justify-end tablet:flex-row tablet:justify-between">
      <div className="items-center flex-1 hidden space-x-2 tablet:flex">
        <p className="text-sm font-medium">Rows per page</p>
        <SelectContainer
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[65px] font-medium hover:bg-secondary/20 hover:border-neutral-400">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((pageSize) => (
              <SelectItem
                key={pageSize}
                value={`${pageSize}`}
                className="mb-1 [&:last-child]:mb-0"
              >
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectContainer>
      </div>
      <div className="flex items-center justify-between w-full space-x-6 laptop:space-x-8 tablet:w-auto">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          {`Page ${
            table.getState().pagination.pageIndex + 1
          } of ${table.getPageCount()}`}
        </div>
        <div className="flex items-center justify-between space-x-2">
          <Button
            variant="outline"
            className="hidden w-8 h-8 p-0 bg-transparent laptop:flex border-neutral-300 text-neutral-900 hover:bg-primary hover:text-white disabled:opacity-20 hover:border-primary"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronFirstIcon className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            className="w-8 h-8 p-0 bg-transparent border-neutral-300 text-neutral-900 hover:bg-primary hover:text-white disabled:opacity-20 hover:border-primary"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="w-5 h-5 mr-0.5" />
          </Button>
          <Button
            variant="outline"
            className="w-8 h-8 p-0 bg-transparent border-neutral-300 text-neutral-900 hover:bg-primary hover:text-white disabled:opacity-20 hover:border-primary"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="w-5 h-5 ml-0.5" />
          </Button>
          <Button
            variant="outline"
            className="hidden w-8 h-8 p-0 bg-transparent laptop:flex border-neutral-300 text-neutral-900 hover:bg-primary hover:text-white disabled:opacity-20 hover:border-primary"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronLastIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  table: PropTypes.any.isRequired,
};

export default Pagination;
