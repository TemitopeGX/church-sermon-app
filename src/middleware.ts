import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Check if it's an admin route
  if (path.startsWith("/admin")) {
    // Get the user's session/token
    const userLoggedIn = request.cookies.get("user-logged-in");

    if (!userLoggedIn) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  // Allow large file uploads for the sermons API endpoint
  if (path.startsWith("/api/sermons")) {
    return NextResponse.next({
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
