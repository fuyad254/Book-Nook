import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const protectedRoutes = ["/add-book", "/my-books", "/my-borrows", "/profile", "/book"];
const authRoutes = ["/login", "/registration"];

const matchesRoute = (pathname: string, routes: string[]) =>
  routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Optimistic check: only verifies that a session cookie exists.
  // Server-side data access should still validate the session.
  const sessionCookie = getSessionCookie(request);

  if (matchesRoute(pathname, protectedRoutes) && !sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  if (matchesRoute(pathname, authRoutes) && sessionCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-book/:path*",
    "/my-books/:path*",
    "/my-borrows/:path*",
    "/profile/:path*",
    "/book/:path*",
    "/login",
    "/registration",
  ],
};
