import { useNavigate } from "react-router-dom";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenuContainer,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuArrow,
} from "@/components/ui";

import ProfileIcon from "~icons/custom/profile";

const menu = [
  {
    label: "Profile",
    link: "/profile",
  },
];

export default function UserMenu() {
  const navigate = useNavigate();

  return (
    <DropdownMenuContainer>
      <DropdownMenuTrigger asChild>
        <div className="ml-auto rounded-full cursor-pointer group hover:outline outline-2 outline-offset-1 outline-primary data-[state=open]:outline">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>
              <ProfileIcon />
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="border-2 rounded-md shadow-lg w-52 border-primary"
        align="end"
      >
        <DropdownMenuGroup className="pb-2">
          <DropdownMenuLabel>
            <div className="text-sm font-bold uppercase break-all text-pretty text-primary">
              firstname lastname
            </div>
            <div className="text-xs font-semibold break-all text-pretty text-neutral-400">
              fname.lastname@email.com
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          {menu.map((item, index) => (
            <DropdownMenuItem
              key={index}
              className="font-semibold text-primary focus:text-primary"
              onSelect={() =>
                location.pathname !== item.link && navigate(item.link)
              }
            >
              <span>{item.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="font-semibold !text-red-500 focus:bg-red-500/30">
          Sign out
        </DropdownMenuItem>

        <DropdownMenuArrow className="fill-primary" />
      </DropdownMenuContent>
    </DropdownMenuContainer>
  );
}
