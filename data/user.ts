"use server"

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


export const getUserById = async (id: string) => {
  try {
    if (id === null) {
      return null;
    }

    const user = db.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

