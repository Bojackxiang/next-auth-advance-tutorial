"use server";

import * as z from "zod";

import { loginSchema, registerSchema } from "@/schemas";

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validateFields = loginSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      error: "Invalid Field!",
    };
  }

  return {
    success: "email sent",
  };
};
