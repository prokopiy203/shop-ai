import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ 1. ЯВНО дозволяємо login
  if (pathname === "/") {
    return NextResponse.next();
  }

  const token = request.cookies.get("accessToken")?.value;

  // ✅ 2. Захищаємо ВСЕ інше під /admin
  if (!token && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
