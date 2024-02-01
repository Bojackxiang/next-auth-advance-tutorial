'use server'

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { generateVerificationToken } from "@/lib/tokens";

export const verification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  //
  if (!existingToken) {
    return {
      error: "no such token",
    };
  }

  //
  const hasExpired = new Date() > existingToken.expires;
  if (hasExpired) {
    return {
      error: "token expired",
    };
  }

  //
  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return {
      error: "No such user",
    };
  }

  //
  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      email: existingToken.email,
      emailVerified: new Date(),
    },
  });

  // 
  await db.verificationToken.delete({
    where: {
    id: existingToken.id
    }
  })

  return {
    success: 'email verified'
  }
  
};
