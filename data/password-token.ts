import {
  deletePasswordResetTokenById,
  getPasswordResetTokenByEmail,
} from "@/lib/password-reset-token";
import { db } from "../lib/db";
import { v4 as uuidv4 } from "uuid";

export const generatePasswordResetToken = async (email: string) => {
  // generate token
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 36000 * 1000);

  // check if exists a password reset token with email
  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await deletePasswordResetTokenById(existingToken.id);
  }

  // create a new token
  const newToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return newToken.token

  // IMPROVE: CHECK THE DATE AND DECIDE WHETHER REGENERATE A NEW TOKEN OR NOT
};

// TODO:
export const verifyPasswordResetToken = async (
  email: string,
  token: string
) => {
  try {
    const passwordToken = await db.passwordResetToken.findFirst({
      where: {
        email: email,
        token: token,
      },
    });

    if (!passwordToken || passwordToken.expires < new Date()) {
      return {
        error: "Invalid token!",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      error: "Something is wrong!",
    };
  }
};
