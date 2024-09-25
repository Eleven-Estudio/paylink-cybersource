import NavDesktop from "@/components/nav/nav-desktop";
import NavHeader from "@/components/nav/nav-header";
import { I18nProviderClient } from "@/locales/client";
import type { ReactElement } from "react";

interface LayoutProps {
  params: { locale: string };
  children: ReactElement;
}

export default async function Layout({ params, children }: LayoutProps) {
  return (
    <I18nProviderClient locale={params.locale}>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <NavDesktop />
        <div className="flex flex-col">
          <NavHeader />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </I18nProviderClient>
  );
}
