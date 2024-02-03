"use server";

import { db } from "@/lib/db";
import * as z from "zod";
import { newPasswordSchema, passwordResetSchema } from "@/schemas";
import bcryptjs from "bcryptjs";

export const resetPassword = async (
  token: string,
  values: z.infer<typeof passwordResetSchema>
) => {
  try {
    console.log("__ starting verify__");
    // verify inputs
    const validateFields = passwordResetSchema.safeParse(values);
    if (!validateFields.success) {
      return {
        error: "Invalid Field!",
      };
    }

    // verify token
    const existPasswordToken = await db.passwordResetToken.findFirst({
      where: {
        token: token,
      },
    });

    if (!existPasswordToken) {
      return {
        error: "Invalid Token!",
      };
    }

    // update password
    const email = existPasswordToken.email;
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        error: "Invalid User!",
      };
    }

    await db.user.update({
      where: {
        email,
      },
      data: {
        password: await bcryptjs.hash(values.newPassword, 10),
      },
    });

    // clean database
    await db.passwordResetToken.delete({
      where: {
        token,
      },
    });

    return {
      success: "Password updated!",
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Something is wrong! Try again later!",
    };
  }
};
