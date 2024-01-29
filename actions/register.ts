"use server";

import * as z from "zod";

import { registerSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

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

  const emailVerificationToken= await generateVerificationToken(email);

  await sendVerificationEmail(email, emailVerificationToken);

  return {
    success: "email sent",
  };
};
