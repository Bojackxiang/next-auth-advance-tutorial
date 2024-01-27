"use server";

import * as z from "zod";

import { registerSchema } from "@/schemas";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validateFields = registerSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      error: "Invalid Field!",
    };
  }

  const { password, email, name } = validateFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const userByEmail = await getUserByEmail(email);

  if (userByEmail !== null) {
    return {
      error: "Email already in use",
    };
  }

  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return {
    success: "email sent",
  };
};
