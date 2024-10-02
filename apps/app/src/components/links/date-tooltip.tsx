"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@v1/ui/tooltip";
import { formatDate } from "date-fns";

type Props = {
  date: string;
};

const DateTooltip = ({ date }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>
          <span className="text-sm text-gray-500">
            {formatDate(date, "MMM d")}
          </span>
        </TooltipTrigger>
        <TooltipContent className="p-3 flex flex-col gap-1">
          <p className="truncate text-sm font-medium text-gray-900">
            {formatDate(date, "MMM d, yyyy, HH:mm a")}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DateTooltip;
