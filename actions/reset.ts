"use server";

import * as z from "zod";

import { resetSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendPasswordResetEmail, sendVerificationEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/data/password-token";

export const resetPassword = async (values: z.infer<typeof resetSchema>) => {
  //
  const validateFields = resetSchema.safeParse(values);
  const { email } = values;

  // check resent password emai l
  if (!validateFields.success) {
    return {
      error: "Invalid Field!",
    };
  }

  // CHECK IF EMAIL EXISTS
  const existingUser = await getUserByEmail(email);
  
  // handle email not exist error
  if (
    !existingUser ||
    !existingUser.email ||
    // check if login with social media
    !existingUser.password
  ) {
    return {
      error: "Invalid account email!",
    };
  }

  // handle if email not verified and else send password reset email
  if (!existingUser.emailVerified) {
    const token = await generateVerificationToken(email);
    try {
      await sendVerificationEmail(email, token);
      return {
        success: "Verify you account first, verify email sent!",
      };
    } catch (error) {
      console.error(error);
      return {
        error: "Something is wrong! Try again later!",
      };
    }
  } else {
    try {
      const passwordResetToken = await generatePasswordResetToken(email);
      await sendPasswordResetEmail(email, passwordResetToken);
      return {
        success: "Password reset email sent!",
      };
    } catch (error) {
      console.error(error);
      return {
        error: "Something is wrong!",
      };
    }
  }
};
