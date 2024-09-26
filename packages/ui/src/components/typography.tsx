// import { cn } from "@/lib/utils"; // TODO: fix this
import { cn } from "../lib/utils";

interface TypographyTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

function TypographyH3({ children, className }: TypographyTitleProps) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className,
      )}
    >
      {children}
    </h3>
  );
}

function TypographyH2({ children, className }: TypographyTitleProps) {
  return (
    <h2
      className={cn(
        "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className,
      )}
    >
      {children}
    </h2>
  );
}

function TypographyH4({ children, className }: TypographyTitleProps) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
    >
      {children}
    </h4>
  );
}

export { TypographyH3, TypographyH2, TypographyH4 };
