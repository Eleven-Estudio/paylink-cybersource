"use client";

import { createClient } from "@v1/supabase/client";
import { Button } from "@v1/ui/button";
import Google from "@v1/ui/icons/google";

export function GoogleSignin() {
  const supabase = createClient();

  const handleSignin = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
  };

  return (
    <Button onClick={handleSignin} variant="outline" className="rounded-md">
      <Google className="mr-2" /> Iniciar sesión con Google
    </Button>
  );
}
