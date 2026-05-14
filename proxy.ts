import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/app/_lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const isAuthPage = request.nextUrl.pathname === "/login";

  // If user is already authenticated and tries to access /login
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is NOT authenticated and tries to access protected routes, redirect to /login
  if (!session && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/onboarding/:path*", "/login"], // Specify the routes the middleware applies to
};
