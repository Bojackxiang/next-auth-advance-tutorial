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

export const resetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const newPasswordSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const passwordResetSchema = z
  .object({
    newPassword: z.string().min(6, {
      message: "Minimum length is 6",
    }),
    confirmPassword: z.string()
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });
