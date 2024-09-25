import { GoogleSignin } from "@/components/google-signin";
import { TypographyH2 } from "@v1/ui/typography";
import Image from "next/image";

export const metadata = {
  title: "Login",
};

export default function Page() {
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
          <TypographyH2>Eleven Payment</TypographyH2>
        </div>
        <GoogleSignin />
      </div>
    </div>
  );
}
