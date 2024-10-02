"use client";

import { useScroll } from "@v1/ui/hooks/use-scroll";
import Divider from "@v1/ui/icons/divider";
import { Isotype } from "@v1/ui/isotype";
import { cn } from "@v1/ui/utils";
import Link from "next/link";
import ProfileUser from "./profile-user";
import Workspace from "./workspace";

export function MainNav() {
  const scrolled = useScroll(80);

  return (
    <div className="flex h-16 items-center justify-between">
      <div className="flex items-center">
        <Link
          href={"/"}
          className={cn(
            "hidden transition-all sm:block",
            scrolled && "translate-y-[3.4rem]",
          )}
        >
          <Isotype
            className={cn(
              "h-8 w-8 fill-black dark:fill-white transition-all duration-75 active:scale-95",
              scrolled && "h-6 w-6",
            )}
          />
        </Link>
        <Divider className="hidden h-8 w-8 text-gray-200 sm:ml-3 sm:block" />
        <Workspace />
      </div>
      <div className="flex items-center space-x-6">
        <ProfileUser />
      </div>
    </div>
  );
}
