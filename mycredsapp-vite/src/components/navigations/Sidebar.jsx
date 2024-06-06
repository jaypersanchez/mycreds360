import { useState } from "react";
import { cn } from "@/lib/utils";

import { Button } from "../ui";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { FlexCenter, FlexCol } from "../flexbox";

export default function Sidebar({ className, noWrap }) {
  const [isWrapped, setWrapped] = useState(false);
  return (
    <aside
      className={cn("flex relative", isWrapped ? "w-[88px]" : "w-[280px]")}
    >
      {!noWrap ? (
        <Button
          size="icon"
          className={cn(
            "fixed z-50 top-6 h-6 w-6 shadow-none hover:border border-gray-300",
            isWrapped ? "left-[78px]" : "left-[270px]"
          )}
          onClick={() => setWrapped(!isWrapped)}
        >
          <ChevronLeftIcon
            className={cn(isWrapped ? "animate-in rotate-180" : "animate-out")}
          />
        </Button>
      ) : null}

      <div
        className={cn(
          "fixed w-[280px] h-full bg-primary border-r border-gray-300 px-4",
          isWrapped ? "w-[88px]" : "w-[280px]",
          className
        )}
      >
        <header className="w-full min-h-20 flex flex-col justify-center text-white">
          <FlexCenter>Logo goes here</FlexCenter>
        </header>

        <FlexCol className="w-full gap-1">
          <h6 className="px-4">Main</h6>
          <Button className="w-full h-[44px] shadow-none justify-between hover:bg-secondary">
            Home
          </Button>
        </FlexCol>
      </div>
    </aside>
  );
}
