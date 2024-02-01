import {
  deletePasswordResetTokenById,
  getPasswordResetTokenByEmail,
} from "@/lib/password-reset-token";
import { db } from "../lib/db";
import { v4 as uuidv4 } from "uuid";

export const generatePasswordResetToken = async (email: string) => {
  // generate token
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour
  let deleted = false;

  // if not exist this token
  const existingToken = await getPasswordResetTokenByEmail(email);
  if (!existingToken) {
    console.log("not exist");
    const newToken = await db.passwordResetToken.create({
      data: {
        email,
        token,
        expires,
      },
    });
    return newToken.token;
  }

  console.log(existingToken.expires, new Date());
  console.log(existingToken.expires < new Date());
  // existed but expired, delete
  if (existingToken && existingToken.expires < new Date()) {
    console.log("exists but expired");
    await deletePasswordResetTokenById(existingToken.id);
    deleted = true;
  }

  // if delete, create new token,
  // otherwise return existing token
  if (deleted) {
    const newToken = await db.passwordResetToken.create({
      data: {
        email,
        token,
        expires,
      },
    });

    return newToken.token;
  } else {
    console.log("exists and not expired");
    return existingToken.token;
  }
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
