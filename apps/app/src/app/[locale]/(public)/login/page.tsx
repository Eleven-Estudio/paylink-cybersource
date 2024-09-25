import { GoogleSignin } from "@/components/google-signin";
import { getI18n } from "@/locales/server";
import { TypographyH2 } from "@v1/ui/typography";
import Image from "next/image";

export const metadata = {
  title: "Login",
};

export default async function Page() {
  const t = await getI18n();

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center size-96 gap-4">
        <div className="flex flex-col items-center justify-center gap-2">
          <Image
            src="/logo.png"
            alt="logo"
            className="w-[140px] aspect-square drop-shadow-lg"
            width={701}
            height={701}
          />
          <TypographyH2>{t("login.title")}</TypographyH2>
        </div>
        <GoogleSignin label={t("login.btnSignIn")} />
      </div>
    </div>
  );
}
