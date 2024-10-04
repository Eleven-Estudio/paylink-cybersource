import { getURL } from "@/lib/url";
import { createClient } from "@v1/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const baseUrl = getURL();
      const redirectUrl = `${baseUrl}${next.startsWith("/") ? next.slice(1) : next}`;

      return NextResponse.redirect(redirectUrl);
    }
  }

  const baseUrl = getURL();
  return NextResponse.redirect(`${baseUrl}?error=auth-code-error`);
}
