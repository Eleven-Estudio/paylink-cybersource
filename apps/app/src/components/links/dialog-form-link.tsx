"use client";

import { createLinkAction } from "@/actions/link/create-link-action";
import { createLinkSchema } from "@/actions/link/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@v1/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@v1/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@v1/ui/form";
import { Input } from "@v1/ui/input";
import { Lucide } from "@v1/ui/lucide";
import { Textarea } from "@v1/ui/textarea";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

type Action = "create" | "edit";

export const TypeAction = {
  create: "create",
  edit: "edit",
} as const;

const DialogFormLink = ({ action }: { action: Action }) => {
  const [status, setStatus] = useState<"loading" | "idle">("idle");
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof createLinkSchema>>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      title: "",
      description: "",
      amount: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof createLinkSchema>) {
    setStatus("loading");
    const result = await createLinkAction(values);

    if (
      result?.data?.status === 201 &&
      result?.data?.statusText === "Created"
    ) {
      toast.success("Link created successfully");
      setOpen(false);
    }

    if (result?.data?.status && result?.data?.status >= 400) {
      toast.error("Error creating link");
    }
    setStatus("idle");
  }

  useEffect(() => {
    if (!open) form.reset();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          {action === TypeAction.create ? "Create Link" : "Edit Link"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {action === TypeAction.create ? "Create Link" : "Edit Link"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        const value = e.target.valueAsNumber;
                        field.onChange(value);
                      }}
                      type="number"
                      step={0.01}
                      min={0.01}
                      placeholder="0.00"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              {status === "loading" ? (
                <>
                  <Lucide.Loader className="animate-spin mr-2 h-4 w-4" />
                  Creating...
                </>
              ) : action === TypeAction.create ? (
                "Create Link"
              ) : (
                "Edit Link"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogFormLink;
