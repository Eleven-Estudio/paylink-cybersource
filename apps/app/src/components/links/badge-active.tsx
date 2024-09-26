import { Badge } from "@v1/ui/badge";
import { cn } from "@v1/ui/utils";
import React from "react";

function BadgeActive({ active }: { active: boolean }) {
  return (
    <div
      className={cn([
        "py-1 px-2 rounded-lg font-semibold text-xs",
        {
          "bg-green-200 text-green-800 border-green-100 shadow-none": active,
          "bg-red-200 text-red-800 border-red-100 shadow-none": !active,
        },
      ])}
    >
      {active ? "Active" : "Inactive"}
    </div>
  );
}

export default BadgeActive;
