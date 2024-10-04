import { truncate } from "@/lib/truncate";
import { useMediaQuery } from "@v1/ui/hooks/use-media-query";
import { cn } from "@v1/ui/utils";

export const states = [
  "pending",
  "paid",
  "failed",
  "canceled",
  "refunded",
  "authoried",
] as const;

export const stateText = {
  pending: "Pending",
  paid: "Paid",
  failed: "Failed",
  canceled: "Canceled",
  refunded: "Refunded",
  authoried: "Authoried",
};

export type stateProps = (typeof states)[number];

export default function TagBadge({
  state,
  className,
}: {
  state: stateProps;
  className?: string;
}) {
  const { isDesktop } = useMediaQuery();

  return (
    <span
      className={cn(
        "my-auto block whitespace-nowrap rounded-md border px-2 py-0.5 text-sm",
        "flex items-center gap-x-1.5 p-1.5 sm:rounded-lg sm:px-2 sm:py-0.5",
        state === "pending" &&
          "border-neutral-300 bg-neutral-100 text-neutral-600",
        state === "paid" && "border-green-300 bg-green-100 text-green-600",
        state === "failed" && "border-red-300 bg-red-100 text-red-600",
        state === "canceled" &&
          "border-orange-300 bg-orange-100 text-orange-600",
        state === "refunded" &&
          "border-red-300/50 bg-red-100/50 text-red-600/70",
        state === "authoried" && "border-teal-300 bg-teal-100 text-teal-600",
        className,
      )}
    >
      <div className="h-1.5 w-1.5 rounded-full bg-current shrink-0" />

      <p className="hidden sm:inline-block">
        {truncate(stateText[state], !isDesktop ? 20 : 24)}
      </p>
    </span>
  );
}

// export const COLORS_LIST: { color: TagColorProps; css: string }[] = [
//   {
//     color: "red",
//     css: "bg-red-100 text-red-600",
//   },
//   {
//     color: "yellow",
//     css: "bg-yellow-100 text-yellow-600",
//   },
//   {
//     color: "green",
//     css: "bg-green-100 text-green-600",
//   },
//   {
//     color: "blue",
//     css: "bg-blue-100 text-blue-600",
//   },
//   {
//     color: "purple",
//     css: "bg-purple-100 text-purple-600",
//   },
//   {
//     color: "brown",
//     css: "bg-brown-100 text-brown-600",
//   },
// ];

// export function randomBadgeColor() {
//   const randomIndex = Math.floor(Math.random() * COLORS_LIST.length);
//   return COLORS_LIST[randomIndex].color;
// }
