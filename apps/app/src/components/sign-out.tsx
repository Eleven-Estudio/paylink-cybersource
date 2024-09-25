"use client";

import { createClient } from "@v1/supabase/client";
import { Button } from "@v1/ui/button";
import { Lucide } from "@v1/ui/lucide";

export function SignOut() {
  const supabase = createClient();

  const handleSignOut = () => {
    supabase.auth.signOut();
  };

  return (
    <Button
      onClick={handleSignOut}
      variant="outline"
      className="font-mono gap-2 flex items-center"
    >
      <Lucide.SignOut className="size-4" />
      <span>Sign out</span>
    </Button>
  );
}
