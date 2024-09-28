import { ChevronDown } from "lucide-react";
import * as React from "react";
import { cn } from "../lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            "appearance-none flex h-10 w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-offset-2 focus-visible:outline-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 pr-8",
            className,
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute h-4 w-4 right-0 mr-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    );
  },
);
Select.displayName = "Select";

export { Select };
