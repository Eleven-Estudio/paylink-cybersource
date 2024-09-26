import DialogFormLink from "@/components/dialog-form-link";
import { getI18n } from "@/locales/server";
import { TypographyH2 } from "@v1/ui/typography";

export const metadata = {
  title: "Links",
};

export default async function Page() {
  const t = await getI18n();

  return (
    <div>
      <div className="flex gap-4 justify-between">
        <TypographyH2>{t("links.title")}</TypographyH2>
        <div className="flex flex-wrap gap-2">
          <DialogFormLink action="create" />
        </div>
      </div>
    </div>
  );
}
