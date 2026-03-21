import { auth } from "@/auth";
import { NextResponse } from "next/server";

// Routes that require a logged-in session
const protectedRoutes = [
  "/dashboard",
  "/tools",
  "/access-key",
  "/announcements",
  "/groups",
  "/vent",
  "/start-membership",
];

// Routes that should bypass protection (e.g. Stripe redirect landing)
const publicExceptions = ["/membership/success"];

// Routes that logged-in users should not see (redirect to dashboard)
const authRoutes = ["/login", "/signup"];

export const middleware = auth((req) => {
  const { nextUrl, auth: session } = req;
  const isLoggedIn = !!session?.user;
  const path = nextUrl.pathname;

  const isException = publicExceptions.some((route) => path.startsWith(route));
  if (isException) return NextResponse.next();

  const isProtected = protectedRoutes.some((route) => path.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => path.startsWith(route));

  // Guest hitting a protected route → send to login
  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // Logged-in user hitting login/signup → send to dashboard
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  return NextResponse.next();
});

export default middleware;

export const config = {
  // Run middleware on all routes except static files and Next.js internals
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
};
