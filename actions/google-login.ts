"use server";

import * as z from "zod";

import { loginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const googleLogin = async () => {
  try {
    // 这边 的 signin 实际上是利用了 auth.config 中的 credentials 来进行登陆
    await signIn("google", {
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return {
      success: "Email has been sent",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid Credentials",
          };

        default:
          return {
            error: "Something is wrong",
          };
      }
    }
    throw error;
  }
};
