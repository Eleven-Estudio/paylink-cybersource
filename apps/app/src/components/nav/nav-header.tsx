import { getScopedI18n } from "@/locales/server";
import { Button } from "@v1/ui/button";
import { Lucide } from "@v1/ui/lucide";
import { Sheet, SheetContent, SheetTrigger } from "@v1/ui/sheet";
import Link from "next/link";
import React from "react";
import NavLink from "../commons/nav-link";
import ProfileCompany from "../profile-company";
import ProfileUser from "../profile-user";

const NavHeader = async () => {
  const t = await getScopedI18n("navigation");

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Lucide.Menu className="h-5 w-5" />
            <span className="sr-only">{t("toggleMenu")}</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <ProfileCompany className="text-lg mb-4" href="#" />

            <NavLink
              href="/"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-base"
              activeClassName="font-bold bg-neutral-200 text-primary hover:text-current"
              nonActiveClassName="text-muted-foreground hover:text-primary"
            >
              <Lucide.Link2 className="h-6 w-6" />
              {t("links")}
            </NavLink>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="ml-auto">
        <ProfileUser />
      </div>
    </header>
  );
};

export default NavHeader;
