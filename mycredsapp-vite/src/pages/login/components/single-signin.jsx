import React from "react";

import { Button } from "@/components/ui";
import { FlexBox } from "@/components/flexbox";

import FacebookIcon from "~icons/custom/facebook";
import InstagramIcon from "~icons/custom/instagram";
import GithubIcon from "~icons/custom/github";
import GoogleIcon from "~icons/custom/google";

const sso = [
  { id: 0, slug: "facebook", icon: FacebookIcon },
  { id: 1, slug: "instagram", icon: InstagramIcon },
  { id: 2, slug: "github", icon: GithubIcon },
  { id: 3, slug: "google", icon: GoogleIcon },
];

export default function SingleSignin() {
  return (
    <FlexBox className="gap-2">
      {sso.map((data) => (
        <Button
          key={data}
          variant="icon"
          className="w-full text-base font-semibold tracking-wider bg-transparent border h-14 border-neutral-400 hover:border-neutral-900"
        >
          <data.icon className="w-6 h-6" />
        </Button>
      ))}
    </FlexBox>
  );
}
