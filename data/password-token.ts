import {
  deletePasswordResetTokenById,
  getPasswordResetTokenByEmail,
} from "@/lib/password-reset-token";
import { db } from "../lib/db";
import { v4 as uuidv4 } from "uuid";

export const generatePasswordResetToken = async (email: string) => {
  let handleCases = -1; // -1: not exist, 0: expired, 1: exists and not expired
  const existingToken = await getPasswordResetTokenByEmail(email);
  
  // cases determine
  if (!existingToken) {
    handleCases = -1;
  }

  if (existingToken && existingToken.expires < new Date()) {
    handleCases = 0;
  }

  if (existingToken && existingToken.expires > new Date()) {
    handleCases = 1;
  }

  // handle cases
  switch (handleCases) {
    case -1:
      const newToken = await db.passwordResetToken.create({
        data: {
          email,
          token: uuidv4(),
          expires: new Date(new Date().getTime() + 3600 * 1000), // 1 hour
        },
      });
      return newToken.token;
    case 0:
      await deletePasswordResetTokenById(existingToken!.id);
      const newToken2 = await db.passwordResetToken.create({
        data: {
          email,
          token: uuidv4(),
          expires: new Date(new Date().getTime() + 3600 * 1000), // 1 hour
        },
      });
      return newToken2.token;
    case 1:
      return existingToken!.token;
    default:
      return null;
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
