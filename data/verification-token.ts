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
    const verificationByToken = await db.verificationToken.findFirst({
      where: {
        token
      },
    });

    return verificationByToken
  } catch (error) {
    return null;
  }
};
