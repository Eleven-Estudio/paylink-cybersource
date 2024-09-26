"use client";

import { useScopedI18n } from "@/locales/client";
import { Button } from "@v1/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@v1/ui/dialog";

type Action = "create" | "edit";
export const TypeAction = {
  create: "create",
  edit: "edit",
} as const;

const DialogFormLink = ({ action }: { action: Action }) => {
  const t = useScopedI18n("links");

  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          {action === TypeAction.create ? t("newLink") : t("editLink")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div>Hola</div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogFormLink;
