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
    console.log({token});
    
    const verificationByToken = await db.verificationToken.findUnique({
      where: {
        token: token,
      },
    });

    console.log('verificationByToken: ', verificationByToken);

    return verificationByToken
  } catch (error) {
    console.log(error)
    return null;
  }
};
