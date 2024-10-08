"use client";

import { getURL } from "@/lib/url";
import { createClient } from "@v1/supabase/client";
import { Button } from "@v1/ui/button";
import Google from "@v1/ui/icons/google";

export function GoogleSignin({ label }: { label: string }) {
  const supabase = createClient();

  const handleSignin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${getURL()}/api/auth/callback`,
      },
    });
  };

  return (
    <Button onClick={handleSignin} variant="outline" className="rounded-md">
      <Google className="mr-2" /> {label}
    </Button>
  );
}
