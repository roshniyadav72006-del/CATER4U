import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  console.log("Middleware running:", pathname);

  // ✅ Allow login page
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // ✅ Allow login API
  if (pathname.startsWith("/api/admin/login")) {
    return NextResponse.next();
  }

  // 🔐 Protect only /admin routes
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("adminToken")?.value;

    if (!token) {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }

    try {
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};