import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/admin/:path*",
};

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("token");

  const url = request.nextUrl.clone();

  if (cookie?.value !== process.env.TOKEN) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}
