import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

import {
  Button,
  DropdownMenuContainer,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
} from "@radix-ui/react-icons";

const Header = ({ column, title, subtitle, className }) => {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-3 px-4 group", className)}>
      <div className="text-sm uppercase">
        <p className="font-bold">{title}</p>
        <p className="text-xs">{subtitle}</p>
      </div>
      <DropdownMenuContainer>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="p-1 h-6 w-6 data-[state=open]:visible data-[state=open]:bg-secondary/30 hover:bg-secondary/30 hover:text-neutral-900 invisible group-hover:visible"
          >
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="w-full h-full" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="w-full h-full" />
            ) : (
              <CaretSortIcon className="w-full h-full" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuGroup className="space-y-1">
            <DropdownMenuItem
              className={cn(
                column.getIsSorted() === "asc" && "bg-secondary/30"
              )}
              onClick={() => column.toggleSorting(false)}
            >
              <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Asc
            </DropdownMenuItem>
            <DropdownMenuItem
              className={cn(
                column.getIsSorted() === "desc" && "bg-secondary/30"
              )}
              onClick={() => column.toggleSorting(true)}
            >
              <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Desc
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuContainer>
    </div>
  );
};

Header.propTypes = {
  column: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  className: PropTypes.string,
};

export default Header;
