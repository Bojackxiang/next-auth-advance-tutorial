import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { loginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";

export default {
  providers: [
    credentials({
      async authorize(credentials) {
        console.log("__email_and_password_credentials_provider__");
        const verifiedFields = loginSchema.safeParse(credentials);

        if (verifiedFields.success) {
          const { email, password } = verifiedFields.data;
          const userByEmail = await getUserByEmail(email);

          //如果用户没有密码，就是社交网络进来的，
          // 那么我们也不允许他们使用密码登陆
          if (userByEmail === null || !userByEmail.password) {
            return null;
          }

          const passwordVerify = await bcrypt.compare(
            password,
            userByEmail.password
          );

          if (passwordVerify) {
            return userByEmail;
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
