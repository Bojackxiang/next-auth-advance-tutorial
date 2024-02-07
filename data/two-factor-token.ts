import { db } from "@/lib/db";
import { uuidv4 as uuid } from "uuid";

//
export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    return await db.twoFactorConfirmationModel.findFirst({
      where: {
        token,
      },
    });
  } catch (error) {
    return null;
  }
};

export const getTwoFactorTokenById = async (id: string) => {
  try {
    return await db.twoFactorConfirmationModel.findFirst({
      where: {
        id,
      },
    });
  } catch (error) {
    return null;
  }
};

export const deleteTwoFactorTokenById = async (id: string) => {
  try {
    return await db.twoFactorConfirmationModel.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateTwoFactorTokenById = async (id: string, token: string) => {
  try {
    return await db.twoFactorConfirmationModel.update({
      where: {
        id,
      },
      data: {
        token,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createTwoFactorTokenByEmail = async (userId: string) => {
  const token = await uuid();
  try {
    return await db.twoFactorConfirmationModel.create({
      data: {
        userId,

        token: token,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};
