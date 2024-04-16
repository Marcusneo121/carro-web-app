import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/settings",
  "/car",
  "/mybooking",
  "/mybooking/",
  "/myhost",
  "/payment",
];

export default function middleware(req: NextRequest) {
  const getTokenCookies = req.cookies.get("JWT_TOKEN");
  const getLoginDataCookies = req.cookies.get("USER_LOGIN_DATA");
  const response = NextResponse.next();

  if (
    getTokenCookies === undefined &&
    getLoginDataCookies === undefined &&
    protectedRoutes.includes(req.nextUrl.pathname)
  ) {
    const absoluteURL = new URL(
      `/login-new?protectfrom=${req.nextUrl.pathname}`,
      req.nextUrl.origin,
    );
    response.headers.set("Cache-Control", "no-store");
    return NextResponse.redirect(absoluteURL.toString());
  } else if (
    getTokenCookies !== undefined &&
    getLoginDataCookies !== undefined &&
    req.nextUrl.pathname.startsWith("/login-new")
  ) {
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
