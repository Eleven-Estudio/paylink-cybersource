"use client";
import { BUSINESS } from "@/business";
import { linkConstructor } from "@/lib/link-constructor";
import type { ColumnDef } from "@tanstack/react-table";
import type { Link } from "@v1/supabase/links";
import { CopyButton } from "@v1/ui/copy-button";
import { Lucide } from "@v1/ui/lucide";
import { format } from "date-fns";
import BadgeActive from "./badge-active";

export const ColumnsLinks: ColumnDef<Link>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          {row.original.title} <BadgeActive active={row.original.active} />
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.original.amount;
      const formattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);

      return <div>{formattedAmount}</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = new Date(row.original.created_at);

      return <div>{format(createdAt, "dd MMM HH:mm")}</div>;
    },
  },
  {
    accessorKey: "views",
    header: "Views",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 rounded-full bg-neutral-100 px-2 py-1 w-fit">
          {row.original.views > 0 ? (
            <Lucide.Eye className="w-3 h-3" />
          ) : (
            <Lucide.EyeOff className="w-3 h-3" />
          )}
          <span className="text-sm font-medium">{row.original.views}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "key",
    header: "",
    cell: ({ row }) => {
      const link = linkConstructor({
        domain: BUSINESS.domain,
        key: row.original.key,
      });
      return <CopyButton value={link} />;
    },
  },
];
