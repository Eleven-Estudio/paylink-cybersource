"use client";

import { insertLinkAction } from "@/actions/link/create-link-action";
import type { createLinkSchema } from "@/actions/link/schema";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@v1/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@v1/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import type { z } from "zod";
import FormLink from "./form-link";

const DialogFormLink = () => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"loading" | "idle">("idle");
  const queryClient = useQueryClient();

  async function onSubmit(values: z.infer<typeof createLinkSchema>) {
    setStatus("loading");
    const result = await insertLinkAction(values);

    if (
      result?.data?.status === 201 &&
      result?.data?.statusText === "Created"
    ) {
      toast.success("Link created successfully");
      queryClient.refetchQueries({ queryKey: ["links"] });
      setOpen(false);
    }

    if (result?.data?.status && result?.data?.status >= 400) {
      toast.error("Error creating link");
    }

    setStatus("idle");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Link</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Link</DialogTitle>
        </DialogHeader>
        <FormLink onSubmit={onSubmit} status={status} action="create" />
      </DialogContent>
    </Dialog>
  );
};

export default DialogFormLink;
