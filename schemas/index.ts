import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const registerSchema = z
  .object({
    email: z.string().email({
      message: "Email is required",
    }),
    password: z.string().min(6, {
      message: "Minimum length is 6",
    }),
    confirmPassword: z.string(),
    name: z.string().min(1, {
      message: "Name is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });
