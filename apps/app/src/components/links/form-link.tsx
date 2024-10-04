import { createLinkSchema } from "@/actions/link/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@v1/ui/button";
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
import { Skeleton } from "@v1/ui/skeleton";
import { Switch } from "@v1/ui/switch";
import { Textarea } from "@v1/ui/textarea";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

type Props = {
  status: "loading" | "idle";
  action: "create" | "edit";
  defaultValues?: z.infer<typeof createLinkSchema>;
  onSubmit: (values: z.infer<typeof createLinkSchema>) => void;
};

export const TypeAction = {
  create: "create",
  edit: "edit",
} as const;

export const FormLinkSkeleton = ({ action }: { action: "create" | "edit" }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-1">
        <Skeleton className="w-16 h-4 rounded-lg" />
        <Skeleton className="w-full h-10 rounded-lg" />
      </div>
      <div className="space-y-1">
        <Skeleton className="w-16 h-4 rounded-lg" />
        <Skeleton className="w-full h-16 rounded-lg" />
      </div>
      <div className="space-y-1">
        <Skeleton className="w-16 h-4 rounded-lg" />
        <Skeleton className="w-full h-10 rounded-lg" />
      </div>
      {action === "edit" && (
        <div className="flex items-center gap-2">
          <Skeleton className="w-10 h-5 rounded-lg" />
          <Skeleton className="w-16 h-5 rounded-lg" />
        </div>
      )}
    </div>
  );
};

const FormLink = ({
  defaultValues = {
    amount: 0,
    title: "",
    description: "",
  },
  onSubmit,
  status,
  action,
}: Props) => {
  const form = useForm<z.infer<typeof createLinkSchema>>({
    resolver: zodResolver(createLinkSchema),
    defaultValues,
  });

  const textButton = useMemo(() => {
    const icon =
      status === "loading" ? (
        <Lucide.Loader className="animate-spin mr-2 h-4 w-4" />
      ) : null;
    let text = "";
    if (status === "loading" && action === TypeAction.create) {
      text = "Creating...";
    } else if (status === "loading" && action === TypeAction.edit) {
      text = "Updating...";
    } else if (action === TypeAction.create) {
      text = "Create Link";
    } else if (action === TypeAction.edit) {
      text = "Update Link";
    }

    return {
      icon,
      text,
    };
  }, [status, action]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 text-left"
      >
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
                <Textarea rows={6} {...field} />
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

        {action === TypeAction.edit && (
          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem className="flex items-center space-y-0">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="pl-2">Active</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button
          className="w-full"
          type="submit"
          disabled={
            status === "loading" ||
            form.formState.isSubmitting ||
            !form.formState.isDirty
          }
        >
          {textButton.icon}
          {textButton.text}
        </Button>
      </form>
    </Form>
  );
};

export default FormLink;
