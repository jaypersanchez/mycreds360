import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

import {
  Button,
  Separator,
  Badge,
  CommandContainer,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  PopoverContainer,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";

import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";

const Filter = ({ column, title, options }) => {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue());

  console.log({ selectedValues });
  return (
    <PopoverContainer>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="bg-transparent border border-neutral-300 hover:border-neutral-400 hover:bg-secondary/20"
        >
          <PlusCircledIcon className="w-4 h-4 mr-2" />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="h-4 mx-2" />
              <Badge
                variant="secondary"
                className="px-2 text-white rounded-md laptop:hidden bg-primary hover:bg-primary"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 laptop:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="px-2 text-white rounded-md bg-primary hover:bg-primary"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="px-2 text-white rounded-md bg-primary hover:bg-primary"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <CommandContainer>
          <CommandInput placeholder={`Search ${title}...`} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options?.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value);
                      } else {
                        selectedValues.add(option.value);
                      }
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      );
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-[4px] border",
                        isSelected
                          ? "bg-secondary text-white border-secondary"
                          : "opacity-50 [&_svg]:invisible border-neutral-500"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                    {option.icon && (
                      <option.icon className="w-4 h-4 mr-2 text-neutral-500" />
                    )}
                    <span>{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className="flex items-center justify-center w-4 h-4 ml-auto font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </CommandContainer>
      </PopoverContent>
    </PopoverContainer>
  );
};

Filter.propTypes = {
  column: PropTypes.any.isRequired,
  title: PropTypes.string,
  options: PropTypes.array,
};

export default Filter;
