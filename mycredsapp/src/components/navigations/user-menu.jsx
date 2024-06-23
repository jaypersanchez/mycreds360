import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
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
    label: "View Profile",
    link: "/profile",
  },
];

export default function UserMenu() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({});
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      // Retrieve the user ID from sessionStorage
      const userString = sessionStorage.getItem('user');
      if (!userString) {
          setError('No user found in session storage.');
          setLoading(false);
          return;
      }
      // Parse the user string back into an object
      const user = JSON.parse(userString);
      console.log(user, user.id);
      setEmail(user.email);
      // Fetch the user profile using the user ID
      fetch(`http://localhost:3000/user-profile/${user.id}`)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Failed to fetch user profile');
              }
              return response.json();
          })
          .then(data => {
              setUserProfile(data[0]);
              console.log('userprofile',userProfile);
              setFullName(`${data[0].first_name} ${data[0].last_name}`);
              setLoading(false);
          })
          .catch(err => {
              console.error('Error fetching user profile:', err);
              setError(err.message);
              setLoading(false);
          });
  }, []);

  const handleSignOut = () => {
    // Clear the session storage
    sessionStorage.removeItem('user');

    // Redirect to the login screen
    navigate('/auth');
  };

  return (
    <DropdownMenu>
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
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div className="text-sm font-bold uppercase break-all text-pretty text-primary">
              {fullName}
            </div>
            <div className="text-xs font-semibold break-all text-pretty text-neutral-400">
              {email}
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
        <DropdownMenuItem className="font-semibold !text-red-500 focus:bg-red-500/30"
          onClick={handleSignOut}
        >
          Sign out
        </DropdownMenuItem>

        <DropdownMenuArrow className="fill-primary" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
