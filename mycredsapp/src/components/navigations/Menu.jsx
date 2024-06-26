import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

import { Button } from "../ui";
import { FlexBox } from "../flexbox";

import { useClickAway } from "@/hooks";

import CloseIcon from "~icons/custom/close";
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

export default function Menu({ setMenuOpen }) {
  const menuRef = useClickAway(() => setMenuOpen(false));
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full desktop:hidden bg-neutral-800/40">
      <Button
        size="icon"
        className="fixed z-50 top-6 h-6 w-6 shadow-none left-[270px] hover:bg-red-500"
        onClick={() => setMenuOpen(false)}
      >
        <CloseIcon className="w-4 h-4" />
      </Button>

      <aside
        ref={menuRef}
        className="fixed w-[280px] h-full px-4 border-r border-neutral-300 bg-white shadow-md"
      >
        <header className="flex flex-col justify-center w-full text-white min-h-20">
          <FlexBox>
            <img className="h-12" src="/logo.png" />
          </FlexBox>
        </header>

        <ul className="flex flex-col w-full gap-1 mt-4">
          {navigations.map((nav, i) => (
            <li
              key={i}
              className={cn(
                "w-full font-semibold rounded-md flex items-center whitespace-nowrap break-all text-pretty gap-4 py-2 pl-3 pr-2 min-h-[44px]",
                location.pathname === nav.link
                  ? "bg-primary text-white hover:bg-primary cursor-default"
                  : "hover:bg-secondary/30 text-primary cursor-pointer"
              )}
              onClick={() => {
                location.pathname !== nav.link && navigate(nav.link);
                setMenuOpen(false);
              }}
            >
              <nav.icon className="w-6" />
              {nav.name}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
