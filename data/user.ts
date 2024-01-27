import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    if (email === null) {
      return null;
    }

    const user = db.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};
