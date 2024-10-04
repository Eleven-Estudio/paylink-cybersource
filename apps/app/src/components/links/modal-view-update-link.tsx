import type { updateLinkSchema } from "@/actions/link/schema";
import { updateLinkAction } from "@/actions/link/update-link-action";
// import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@v1/supabase/client";
import { getLink, getTransactions } from "@v1/supabase/queries";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@v1/ui/dialog";
import { Lucide } from "@v1/ui/lucide";
import { Skeleton } from "@v1/ui/skeleton";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { z } from "zod";
import FormLink, { FormLinkSkeleton } from "./form-link";
import { useLinkContext } from "./links-list";
import TableTransactions, {
  TableTransactionsSkeleton,
} from "./table-transactions";

const ModalViewUpdateLink = () => {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const { link, setLink } = useLinkContext();
  const [status, setStatus] = useState<"loading" | "idle">("idle");
  const [isOpen, setOpen] = useState(false);

  const {
    data,
    isLoading,
    refetch: refetchLink,
  } = useQuery({
    queryKey: ["link", link],
    queryFn: async () => (await getLink(supabase, link ?? 0)).data,
    enabled: !!link,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  const {
    data: transactions,
    isLoading: isLoadingTransactions,
    refetch: refetchTransactions,
  } = useQuery({
    queryKey: ["transactions", link],
    queryFn: async () => (await getTransactions(supabase, link ?? 0)).data,
    enabled: !!data?.id,
    refetchOnMount: true,
  });

  const defaultValues = useMemo(() => {
    return {
      title: data?.title ?? "",
      description: data?.description ?? "",
      amount: data?.amount ?? 0,
      active: data?.active ?? true,
    };
  }, [data]);

  const handleClose = (open: boolean) => {
    setLink(null);
    setOpen(open);
  };

  const onSubmit = async (values: z.infer<typeof updateLinkSchema>) => {
    setStatus("loading");
    if (!data?.id) return;
    const result = await updateLinkAction({ ...values, id: data?.id });

    if (result?.data?.status === 204) {
      toast.success("Link updated successfully");
      queryClient.refetchQueries({ queryKey: ["links"] });
      handleClose(false);
    }

    if (result?.data?.status && result?.data?.status >= 400) {
      toast.error("Error creating link");
    }

    setStatus("idle");
  };

  useEffect(() => {}, [isOpen]);

  useEffect(() => {
    queryClient.removeQueries({ queryKey: ["link", data?.id] });
    queryClient.removeQueries({ queryKey: ["transactions", data?.id] });
    setOpen(!!link);
  }, [link]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="rounded-xl max-w-screen-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="relative shrink-0 items-center justify-center flex gap-2">
              <div className="w-7  h-7 bg-neutral-100 rounded-full flex items-center justify-center">
                <Lucide.Link className="w-4 h-4 stroke-2" />
              </div>
              {isLoading ? <Skeleton className="w-20 h-4" /> : data?.title}
            </div>
          </DialogTitle>
          <div className="grid w-full gap-y-6 max-md:overflow-auto md:grid-cols-[2fr_1.5fr] max-md:max-h-[calc(100dvh-200px)] max-md:min-h-[min(510px,_calc(100dvh-200px))] md:[&>div]:max-h-[calc(100dvh-200px)] md:[&>div]:min-h-[min(510px,_calc(100dvh-200px))] py-4">
            <div className="pr-6">
              {isLoading ? (
                <FormLinkSkeleton action="edit" />
              ) : (
                <FormLink
                  defaultValues={defaultValues}
                  onSubmit={onSubmit}
                  status={status}
                  action="edit"
                />
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-xl border border-gray-200 bg-gray-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
              <div className="relative flex flex-col gap-6 p-4">
                {isLoadingTransactions ? (
                  <TableTransactionsSkeleton />
                ) : (
                  <TableTransactions transactions={transactions ?? []} />
                )}
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ModalViewUpdateLink;
