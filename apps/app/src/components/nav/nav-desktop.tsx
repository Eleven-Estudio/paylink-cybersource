import { getScopedI18n } from "@/locales/server";
import { Lucide } from "@v1/ui/lucide";
import NavLink from "../commons/nav-link";
import ProfileCompany from "../profile-company";

const NavDesktop = async () => {
  const scopedI18n = await getScopedI18n("navigation");

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        {/* Header */}
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <ProfileCompany />
        </div>

        {/* Navigation */}
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <NavLink
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all"
              activeClassName="font-bold bg-neutral-200 text-primary hover:text-current"
              nonActiveClassName="text-muted-foreground hover:text-primary"
            >
              <Lucide.Link2 className="h-4 w-4" />
              {scopedI18n("links")}
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NavDesktop;
