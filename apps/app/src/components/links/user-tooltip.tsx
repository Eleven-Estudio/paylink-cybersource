"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@v1/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@v1/ui/tooltip";
import * as React from "react";

type Props = {
  name: string;
  email: string;
  avatar_url: string;
};

const CreatedByTooltip = ({ name, email, avatar_url }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>
          <Avatar className="h-4 w-4 border border-gray-200">
            <AvatarImage src={avatar_url} alt={name} />
            <AvatarFallback>
              <span className="uppercase text-xs">{name?.slice(0, 1)}</span>
            </AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent className="p-3 flex flex-col gap-1">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatar_url} alt={name} />
            <AvatarFallback>
              <span className="uppercase">{name?.slice(0, 1)}</span>
            </AvatarFallback>
          </Avatar>
          <p className="truncate text-sm font-medium text-gray-900">{name}</p>
          <p className="truncate text-sm text-gray-500">{email}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CreatedByTooltip;
