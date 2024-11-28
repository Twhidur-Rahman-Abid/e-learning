import { PUBLIC_ROUTS } from "@/constents/routes";
import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const session = await getServerSession(authOptions);

  const { nextUrl } = request;
  const { name, email } = session?.user;

  const isAuthenticated = name && email;

  const isPublicRoute = PUBLIC_ROUTS.find((route) =>
    nextUrl.pathname.startWith(route)
  );

  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
