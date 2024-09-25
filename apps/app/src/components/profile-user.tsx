"use client";

import { useScopedI18n } from "@/locales/client";
import { createClient } from "@v1/supabase/client";
import { Button } from "@v1/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@v1/ui/dropdown-menu";
import { Lucide } from "@v1/ui/lucide";
import { useRouter } from "next/navigation";

const ProfileUser = () => {
  const router = useRouter();
  const scopedT = useScopedI18n("profile");

  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <Lucide.CircleUser className="h-5 w-5" />
          <span className="sr-only">{scopedT("toggleUserMenu")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleSignOut}>
          {scopedT("logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileUser;
