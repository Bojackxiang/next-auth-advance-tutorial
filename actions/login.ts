"use server";

import * as z from "zod";

import { loginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof loginSchema>) => {
  //
  const validateFields = loginSchema.safeParse(values);
  const { email, password } = values;

  //
  if (!validateFields.success) {
    return {
      error: "Invalid Field!",
    };
  }

  // block existing oauth user login by credentials
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.password || !existingUser.email) {
    return {
      error: "Invalid Credentials",
    };
  }

  if (!existingUser.emailVerified) {
    // email is not verified

    const token = await generateVerificationToken(email);

    await sendVerificationEmail(email, token);

    return {
      success: "Confirmation email sent!",
    };
  } else {
    // email has been verified

    try {
      // 这边 的 signin 实际上是利用了 auth.config 中的 credentials 来进行登陆
      await signIn("credentials", {
        email,
        password,
        redirectTo: DEFAULT_LOGIN_REDIRECT,
      });

      return {
        success: "",
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
  }
};
