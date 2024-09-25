import { BUSINESS } from "@/business";
import { Avatar, AvatarFallback, AvatarImage } from "@v1/ui/avatar";
import { cn } from "@v1/ui/utils";
import Link from "next/link";
import React from "react";

const ProfileCompany = ({
  className,
  href = "/",
}: { className?: string; href?: string }) => {
  return (
    <Link
      href={href}
      className={cn("flex items-center gap-2 font-semibold", className)}
    >
      <Avatar>
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
      <span className="text-sm font-bold line-clamp-1">{BUSINESS.name}</span>
    </Link>
  );
};

export default ProfileCompany;
