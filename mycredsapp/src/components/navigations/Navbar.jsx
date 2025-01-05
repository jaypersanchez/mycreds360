import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

import { FlexBetween, FlexBox } from "../flexbox";
import { Button } from "../ui";

import UserMenu from "./user-menu";

import MenuIcon from "~icons/custom/menu";
import Menu from "./Menu";

export default function Navbar({ className }) {
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.setAttribute("data-disable-scroll", "1");
    } else {
      document.body.removeAttribute("data-disable-scroll");
    }
  }, [isMenuOpen]);
  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex items-center px-6 desktop:px-10 min-h-16 bg-white border-b border-neutral-300",
        className
      )}
    >
      <FlexBetween className="w-full">
        <FlexBox className="gap-4 desktop:hidden">
          <Button
            size="icon"
            className={cn("h-8 w-8 shadow-none")}
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            <MenuIcon className={cn("w-5 h-5")} />
          </Button>
          <img
            className="h-12 cursor-pointer"
            src="/logo.png"
            onClick={() => navigate("/")}
          />
        </FlexBox>

        <UserMenu />
      </FlexBetween>
      {isMenuOpen && <Menu setMenuOpen={setMenuOpen} />}
    </header>
  );
}
