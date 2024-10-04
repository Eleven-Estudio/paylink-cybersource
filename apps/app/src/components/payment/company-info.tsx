import { BUSINESS } from "@/business";
import { Avatar, AvatarFallback, AvatarImage } from "@v1/ui/avatar";
import { Skeleton } from "@v1/ui/skeleton";
import { cn } from "@v1/ui/utils";
import React from "react";

interface Props {
  className?: string;
  name: string;
  logo: {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
  };
}

const BadgeMode = ({ className }: { className?: string }) => {
  if (process.env.CYBERSORUCE_RUN_ENVIRONMENT !== "development") return null;
  return (
    <span
      className={cn(
        "my-auto block whitespace-nowrap rounded-md border px-2 py-0.5 text-xs",
        "flex items-center gap-x-1.5 p-1.5 sm:rounded-lg sm:px-2 sm:py-0.5",
        "border-orange-300 bg-orange-100 text-orange-600",
        className,
      )}
    >
      TEST MODE
    </span>
  );
};

export const CompanyInfoSkeleton = () => {
  return (
    <div className="bg-white checkout:bg-transparent p-4 checkout:p-0 fixed top-0 left-0 z-40 w-full checkout:static checkout-header">
      <div className="max-w-sm checkout:max-w-full checkout:w-auto mx-auto flex justify-center checkout:justify-start items-center gap-2 font-semibold">
        <Skeleton className="w-6 h-6 rounded-full" />
        <Skeleton className="w-[160px] h-5" />
      </div>
    </div>
  );
};

const CompanyInfo = ({ className, name, logo }: Props) => {
  return (
    <div
      className={cn(
        "bg-white checkout:bg-transparent p-4 checkout:p-0 fixed top-0 left-0 z-40 w-full checkout:static checkout-header",
        className,
      )}
    >
      <div className="max-w-sm checkout:max-w-full checkout:w-auto mx-auto flex justify-center checkout:justify-start items-center gap-2 font-semibold">
        <Avatar className="w-6 h-6 shadow-md">
          <AvatarImage
            src={BUSINESS.logo.src}
            alt={BUSINESS.logo?.alt}
            height={BUSINESS.logo?.height}
            width={BUSINESS.logo?.width}
          />
          <AvatarFallback>
            <span className="uppercase">{name?.slice(0, 1)}</span>
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-semibold line-clamp-1 text-neutral-700 ">
          {name}
        </span>
        <BadgeMode />
      </div>
    </div>
  );
};

export default CompanyInfo;
