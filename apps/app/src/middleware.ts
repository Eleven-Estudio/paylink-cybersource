import { updateSession } from "@v1/supabase/middleware";
import { type NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/login"];
const PRIVATE_ROUTES = ["/", "/settings", "/profile"];

function isPrivateRoute(pathname: string): boolean {
  return PRIVATE_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.includes(pathname);
}

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  // Ruta dinámica pública
  if (pathname.match(/^\/[^/]+$/)) {
    return response;
  }

  // Redirigir usuarios autenticados fuera de /login
  if (pathname === "/login" && user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Proteger rutas privadas
  if (isPrivateRoute(pathname) && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Permitir acceso a rutas públicas
  if (isPublicRoute(pathname)) {
    return response;
  }

  // Por defecto, permitir el acceso
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|api|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
