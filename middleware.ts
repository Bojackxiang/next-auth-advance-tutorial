import authConfig from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLogged = !!req.auth;
  console.log("isLogged: ", isLogged);
  console.log("route name", req.nextUrl.pathname);
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
