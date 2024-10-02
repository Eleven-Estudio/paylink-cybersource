"use client";

import { cn } from "@v1/ui/utils";
import React from "react";
import Logo from "../commons/logo";

const Powered = ({ className }: { className: string }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 text-[10px] text-neutral-400 transition-all duration-300 mt-4",
        className,
      )}
    >
      <a
        href="https://elevenestudio.link/pw-cyberpay"
        target="_blank"
        className="flex items-center gap-2"
        rel="noreferrer"
      >
        <span>Powered by </span>
        <Logo className="h-3 w-auto fill-neutral-400" />
      </a>
    </div>
  );
};

export default Powered;
