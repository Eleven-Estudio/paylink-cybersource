import type { Tables } from "@v1/supabase/types";
import { Button } from "@v1/ui/button";
import { Lucide } from "@v1/ui/lucide";
import { Popover, PopoverContent, PopoverTrigger } from "@v1/ui/popover";
import { Skeleton } from "@v1/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@v1/ui/table";
import { cn } from "@v1/ui/utils";
import { format } from "date-fns";
import JSONReaderCard from "./json-reader-card";

interface TableTransactionsProps {
  transactions: Tables<"transactions">[];
}

export const typeText = {
  authorization: "Authorization",
  capture: "Capture",
};
export const statusText = {
  success: "Success",
  error: "Error",
};

export const TableTransactionsSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>State</TableHead>
          <TableHead>Metadata</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <Skeleton className="w-10 h-4 rounded-lg" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-10 h-4 rounded-lg" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-10 h-4 rounded-lg" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-10 h-4 rounded-lg" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

const TableTransactions = ({ transactions }: TableTransactionsProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>State</TableHead>
          <TableHead>Metadata</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions?.length > 0 ? (
          transactions.map((transaction) => {
            const formattedDate = format(
              new Date(transaction.created_at),
              "dd MMM yyyy HH:mm",
            );

            return (
              <TableRow key={transaction.id}>
                <TableCell>{formattedDate}</TableCell>
                <TableCell>{typeText[transaction.type]}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "my-auto block whitespace-nowrap rounded-md border px-2 py-0.5 text-sm w-fit",
                      "flex items-center gap-x-1.5 p-1.5 sm:rounded-lg sm:px-2 sm:py-0.5",
                      transaction.status === "success" &&
                        "border-green-300 bg-green-100 text-green-600",
                      transaction.status === "error" &&
                        "border-red-300 bg-red-100 text-red-600",
                    )}
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-current shrink-0" />
                    <p className="hidden sm:inline-block">
                      {statusText[transaction.status]}
                    </p>
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center">
                    <Popover>
                      <PopoverTrigger>
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-6 h-6"
                        >
                          <Lucide.JsonIcon className="w-3 h-3" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto rounded-lg">
                        <JSONReaderCard
                          isError={transaction.status === "error"}
                          data={
                            transaction.transaction_meta_data as Record<
                              string,
                              unknown
                            >
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow className="hover:bg-transparent">
            <TableCell
              colSpan={4}
              className="text-center font-semibold text-gray-500/50 py-10 bg-transparent"
            >
              No transactions found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TableTransactions;
