import type { NextAuthConfig } from "next-auth";
// 
import bcrypt from "bcryptjs";
import credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
// 
import { getUserByEmail } from "./data/user";
import { loginSchema } from "./schemas";



export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
    credentials({
      async authorize(credentials) {
        console.debug("__email_and_password_credentials_provider__");
        try {
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
        } catch (error) {
          console.error("authorize");
          console.error(error);
          return null
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
