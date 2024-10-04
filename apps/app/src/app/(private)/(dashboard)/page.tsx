import DialogFormLink from "@/components/links/dialog-form-link";
import LinksList from "@/components/links/links-list";
import { MaxWidthWrapper } from "@v1/ui/max-width-wrapper";

export const metadata = {
  title: "Links",
};

export default function Page() {
  return (
    <>
      <div className="mt-10 flex w-full items-center pt-3">
        <MaxWidthWrapper className="flex flex-col gap-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 md:flex-nowrap">
            <h1 className="order-1 text-2xl font-semibold tracking-tight text-black">
              Links
            </h1>
            <div className="grow-0 order-2">
              <DialogFormLink />
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
      <div className="mt-3">
        <MaxWidthWrapper className="grid gap-y-2">
          <LinksList />
        </MaxWidthWrapper>
      </div>
    </>
  );
}
