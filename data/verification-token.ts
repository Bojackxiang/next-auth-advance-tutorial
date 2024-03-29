"use server"

import { db } from "@/lib/db";

export const getVerificationEmail = async (email: string) => {
  try {
    return await db.verificationToken.findFirst({
      where: {
        email,
      },
      orderBy: {
        expires: "desc",
      },
    });

  } catch (error) {
    return null;
  }
};


export const getVerificationTokenByToken = async (token: string) => {
  try {

    const verificationByToken = await db.verificationToken.findUnique({
      where: {
        token: token,
      },
    });

    return verificationByToken
  } catch (error) {
    console.error(error)
    return null;
  }
};
