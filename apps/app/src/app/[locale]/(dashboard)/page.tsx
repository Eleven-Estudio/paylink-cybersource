import DialogFormLink from "@/components/links/dialog-form-link";
import LinksServer from "@/components/links/link.server";
import LinksLoading from "@/components/links/links.loading";
import { TypographyH2 } from "@v1/ui/typography";
import { Suspense } from "react";

export const metadata = {
  title: "Links",
};

export default async function Page() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex gap-4 justify-between items-center">
        <TypographyH2>Links</TypographyH2>
        <div className="flex flex-wrap gap-2">
          <DialogFormLink action="create" />
        </div>
      </div>
      <Suspense fallback={<LinksLoading />}>
        <LinksServer />
      </Suspense>
    </div>
  );
}
