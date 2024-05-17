import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  unstable_decide,
  unstable_serialize,
} from "@vercel/flags/next/middleware";
import * as flags from "@/lib/middleware-flags";

export const config = {
  matcher: ["/", "/product/:path*", "/cart", "/success"],
};

export async function middleware(request: NextRequest) {
  let response = NextResponse.next();

  // decide via middleware flags for the homepage only
  if (request.nextUrl.pathname === "/") {
    const context = {
      /* pass any context data your flag may need */
    };
    const flagSet = await unstable_decide(request, flags, context);
    const code = await unstable_serialize(flagSet, flags);

    // rewrites the request to the variant for this flag combination
    const nextUrl = new URL(
      `/${code}${request.nextUrl.pathname}${request.nextUrl.search}`,
      request.url
    );
    response = NextResponse.rewrite(nextUrl, { request });
  }

  // set a shopper cookie if one doesn't exist or has been cleared
  if (!request.cookies.has("shopper")) {
    const newShopperId = Math.random().toString(36).substring(2);
    response.cookies.set("shopper", newShopperId);
  }

  return response;
}
