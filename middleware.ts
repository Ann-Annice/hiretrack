import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  console.log("TOKEN:", token);

  if (
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/register"
  ) {
    return NextResponse.next();
  }

  if (!token) {
    console.log("NO TOKEN");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.AUTH_SECRET!
    );

    console.log(decoded);

    return NextResponse.next();
  } catch (err) {
    console.log("JWT ERROR:", err);

    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/jobs/:path*",
    "/candidates/:path*",
    "/interviews/:path*",
  ],
};