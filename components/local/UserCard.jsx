"use client";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { User2Icon } from "lucide-react";
import { Button } from "../ui/button";

import { signOut } from "next-auth/react";

const UserCard = ({ name, email }) => {
  const handleSignOut = () => {
    signOut();
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <User2Icon />
          </TooltipTrigger>
          <TooltipContent className="p-6 space-y-4">
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <div className="flex gap-6">
              <Button>Profile</Button>
              <Button onClick={handleSignOut} variants="secondary">
                Logout
              </Button>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default UserCard;
