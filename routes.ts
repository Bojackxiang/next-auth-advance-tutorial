export const publicRoutes = [
  "/",
  "/auth/new-verification",
];

// will check if the user is logged in
// if login, redirect to the home page
// otherwise redirect the following path
export const authRoutes = [ 
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
];

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/settings";
