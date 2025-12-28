import next from "next";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { get } from "node:http";

const privateRoute = ["/dashboard", "/cart", "/checkout"];
// This function can be marked `async` if using `await` inside
export async function proxy(req) {
  //   return NextResponse.redirect(new URL('/', request.url))
  const token = await getToken({ req });
  const isAuthenticated = Boolean(token);
  const isPrivateReq = privateRoute.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );
  if (!isAuthenticated && isPrivateReq) {
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${req.url}`, req.url)
    );
  }
  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

export const config = {
  matcher: ["/dashboard/:path*", "/cart/:path*", "/checkout/:path*"],
};
