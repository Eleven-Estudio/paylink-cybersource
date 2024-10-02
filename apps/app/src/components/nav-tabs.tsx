"use client";

import { useScroll } from "@v1/ui/hooks/use-scroll";
import { cn } from "@v1/ui/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function NavTabs() {
  const pathname = usePathname();

  const tabs = useMemo(() => [{ name: "Links", href: "/" }], []);
  const scrolled = useScroll(80);

  return (
    <div
      className={cn(
        "scrollbar-hide relative flex gap-x-2 overflow-x-auto transition-all",
        scrolled && "sm:translate-x-9",
      )}
    >
      {tabs.map(({ name, href }) => {
        const isActive =
          href === "/" ? pathname === href : pathname.startsWith(href);

        return (
          <Link key={href} href={href} className="relative">
            <div className="mx-1 my-1.5 rounded-md px-3 py-1.5 transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
              <p className="text-sm text-gray-600 hover:text-black">{name}</p>
            </div>
            {isActive && (
              <motion.div
                layoutId="indicator"
                transition={{
                  duration: 0.25,
                }}
                className="absolute bottom-0 w-full px-1.5"
              >
                <div className="h-0.5 bg-black" />
              </motion.div>
            )}
          </Link>
        );
      })}
    </div>
  );
}
