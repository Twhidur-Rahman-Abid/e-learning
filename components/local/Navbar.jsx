import Link from "next/link";
import React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getServerSession } from "next-auth";
import { Button } from "../ui/button";
import authOptions from "@/lib/auth";
import UserCard from "./UserCard";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const { name, email } = session?.user || {};
  return (
    <nav className=" sticky top-0 left-0 w-full border flex justify-between items-center bg-white z-50  px-[10%] min-h-[10vh] md:py-0  ">
      {/* logo */}
      <Link href="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 text-purple-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
          />
        </svg>
      </Link>

      {/* nav list */}
      <div className="p-4 hidden   md:flex gap-[5vw] items-center">
        <p className="text-base md:text-lg font-medium">My Course</p>
        <Link href="/teacher" className="text-base md:text-lg font-medium">
          Teacher
        </Link>
        <p className="text-base md:text-lg font-medium">Deshboard</p>
        <p className="text-base md:text-lg font-medium">FAQ</p>
      </div>

      {/* nav buttons */}
      <div className="hidden md:block">
        {name ? (
          <UserCard name={name} email={email} />
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>

      {/* mobile nav list */}
      {/* <MobileNav user={user} logout={logout} /> */}
    </nav>
  );
};

export default Navbar;
