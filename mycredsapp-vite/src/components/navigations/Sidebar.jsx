import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

import { Button } from "../ui";
import { FlexCenter } from "../flexbox";

import LeftIcon from "~icons/custom/left";
import DashboardIcon from "~icons/custom/dashboard";
import AdminIcon from "~icons/custom/admin";
import StudentIcon from "~icons/custom/student";
import InstitutionIcon from "~icons/custom/institution";
import CertificateIcon from "~icons/custom/cert";
import CourseIcon from "~icons/custom/course";
import BadgeIcon from "~icons/custom/badge";
import RolesIcon from "~icons/custom/roles";
import SettingsIcon from "~icons/custom/settings";

const navigations = [
  {
    icon: DashboardIcon,
    name: "Dashboard",
    link: "/",
  },
  {
    icon: AdminIcon,
    name: "Admin",
    link: "/admin",
  },
  {
    icon: StudentIcon,
    name: "Student",
    link: "/student",
  },
  {
    icon: InstitutionIcon,
    name: "Institution",
    link: "/institution",
  },
  {
    icon: CertificateIcon,
    name: "Certificate Template",
    link: "/cert-template",
  },
  {
    icon: CourseIcon,
    name: "Course",
    link: "/course",
  },
  {
    icon: BadgeIcon,
    name: "Badge",
    link: "/badge",
  },
  {
    icon: RolesIcon,
    name: "Roles",
    link: "/roles",
  },
  {
    icon: SettingsIcon,
    name: "Settings",
    link: "/settings",
  },
];

export default function Sidebar({ className }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isWrapped, setWrapped] = useState(false);

  const parentLocation = `/${location.pathname.split("/").at(1).toString()}`;

  return (
    <aside
      className={cn(
        "hidden desktop:block relative",
        isWrapped ? "w-[88px]" : "w-[280px]"
      )}
    >
      <Button
        size="icon"
        className={cn(
          "fixed z-50 top-6 h-6 w-6 shadow-none",
          isWrapped ? "left-[78px]" : "left-[270px]"
        )}
        onClick={() => setWrapped(!isWrapped)}
      >
        <LeftIcon
          className={cn(
            "w-4 h-4",
            isWrapped ? "animate-in rotate-180" : "animate-out mr-0.5"
          )}
        />
      </Button>

      <div
        className={cn(
          "fixed h-full border-r border-neutral-300",
          isWrapped ? "w-[88px] px-1" : "w-[280px] px-4",
          className
        )}
      >
        <header className="flex flex-col justify-center w-full text-white min-h-20">
          <FlexCenter className={cn(!isWrapped && "justify-start")}>
            <img
              className={cn(isWrapped ? "w-[68px]" : "h-12")}
              src="/logo.png"
            />
          </FlexCenter>
        </header>

        <ul className="flex flex-col w-full gap-1 mt-4">
          {navigations.map((nav, i) => (
            <li
              key={i}
              className={cn(
                "w-full font-semibold rounded-md flex items-center whitespace-nowrap break-all text-pretty",
                isWrapped
                  ? "flex-col text-[10px] p-1 min-h-[56px] justify-center gap-0.5 text-center"
                  : "flex-row gap-4 py-2 pl-3 pr-2 min-h-[44px]",
                location.pathname === nav.link || parentLocation === nav.link
                  ? "bg-primary text-white hover:bg-primary cursor-default"
                  : "hover:bg-secondary/30 text-primary cursor-pointer"
              )}
              onClick={() =>
                location.pathname !== nav.link && navigate(nav.link)
              }
            >
              <nav.icon className={cn(isWrapped ? "w-5" : "w-6")} />
              {nav.name}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
