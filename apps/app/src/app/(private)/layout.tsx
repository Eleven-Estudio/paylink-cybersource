import { MainNav } from "@/components/main-nav";
import NavTabs from "@/components/nav-tabs";
import Providers from "@/components/providers";
import { MaxWidthWrapper } from "@v1/ui/max-width-wrapper";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s - Eleven Checkout",
    default: "Eleven Checkout",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)" },
    { media: "(prefers-color-scheme: dark)" },
  ],
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <div className="min-h-screen w-full bg-gray-50/80">
        <div className="sticky -top-16 z-20 border-b border-gray-200 bg-white">
          <MaxWidthWrapper>
            <MainNav />
            <Suspense fallback={<div className="h-12 w-full" />}>
              <NavTabs />
            </Suspense>
          </MaxWidthWrapper>
        </div>
        {children}
        <div className="h-[90px]" />
      </div>
    </Providers>
  );
}
