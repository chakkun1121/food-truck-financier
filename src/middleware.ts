import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (process.env.DISABLE_ADMIN_CONSOLE === "true") {
    const url = request.nextUrl;
    if (url.pathname.startsWith("/api/admin")) {
      return NextResponse.json({ message: "Admin console is disabled" }, { status: 403 });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/admin/:path*"],
};
