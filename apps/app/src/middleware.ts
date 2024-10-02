import { updateSession } from "@v1/supabase/middleware";
import { type NextRequest, NextResponse } from "next/server";

const PUBLIC_ABSOLUTE_PATHS = ["/login"];
const PRIVATE_ABSOLUTE_PATHS = ["/"];

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request);

  // if (
  //   !PUBLIC_ABSOLUTE_PATHS.includes(request.nextUrl.pathname) &&
  //   !PRIVATE_ABSOLUTE_PATHS.includes(request.nextUrl.pathname)
  // ) {
  //   return response;
  // }
  // Redirigir a /login si no está autenticado y no es la ruta de login
  if (!request.nextUrl.pathname.endsWith("/login") && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|api|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
