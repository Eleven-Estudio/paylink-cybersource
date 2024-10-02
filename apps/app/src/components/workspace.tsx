"use client";

import { BUSINESS } from "@/business";
import { Avatar, AvatarFallback, AvatarImage } from "@v1/ui/avatar";
import { cn } from "@v1/ui/utils";
import React from "react";

const ProfileCompany = ({ className }: { className?: string }) => {
  return (
    <div className="sm:inline-flex flex items-center justify-between rounded-lg bg-white p-1.5 text-left text-sm transition-all duration-75 hover:bg-gray-100 focus:outline-none active:bg-gray-200">
      <div
        className={cn(
          "flex items-center space-x-3 pr-2 font-semibold",
          className,
        )}
      >
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={BUSINESS.logo.src}
            alt={BUSINESS.logo.alt}
            height={BUSINESS.logo.height}
            width={BUSINESS.logo.width}
          />
          <AvatarFallback>
            <span className="uppercase">{BUSINESS.name?.slice(0, 1)}</span>
          </AvatarFallback>
        </Avatar>
        <span className="inline-block max-w-[100px] truncate text-sm font-medium sm:max-w-[200px]">
          {BUSINESS.name}
        </span>
      </div>
    </div>
  );
};

export default ProfileCompany;
