import { Badge } from "@v1/ui/badge";
import { cn } from "@v1/ui/utils";
import React from "react";

function BadgeActive({ active }: { active: boolean }) {
  return (
    <div
      className={cn([
        "py-[3px] px-[6px] rounded-lg font-semibold text-xs",
        {
          "bg-[#D1FAB3] text-[#217007] border border-[#A8F171] shadow-none":
            active,
          "bg-red-200/60 text-red-800 border border-red-300 shadow-none":
            !active,
        },
      ])}
    >
      {active ? "Active" : "Inactive"}
    </div>
  );
}

export default BadgeActive;
