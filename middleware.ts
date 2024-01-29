/**
 * middleware will decide whether the clicked route will be redirect
 */

import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT, 
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLogged = !!req.auth;
  console.log("isLogged: ", isLogged);
  console.log("route name", req.nextUrl.pathname);

  // check api, public routes, and authRoutes
  const apiAuthRoute = req.nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);
  const isAuthROute = authRoutes.includes(req.nextUrl.pathname);

  console.log({
    apiAuthRoute,
    isPublicRoute,
    isAuthROute,
  });

  if (apiAuthRoute) {
    return null;
  }

  if (isPublicRoute) {
    return null;
  }

  if (isAuthROute) {
    if (isLogged) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl));
    }
    return null;
  }

  if (!isLogged && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", req.nextUrl));
  }

  return null;
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    // "/auth/register",
    // "/auth/login"
  ],
};
