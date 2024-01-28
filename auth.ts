import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import NextAuth from "next-auth";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async signIn({ user }) {
      // let existingUser = null;
      // if (user.id) {
      //   existingUser = await getUserById(user.id);
      // } else {
      //   return false;
      // }

      // if (!existingUser?.emailVerified) {
      //   return false;
      // }

      return true;
    },
    // 要改 session， 先改 token
    async session(params) {
      // @ts-ignore
      const { session, token } = params;
      // console.log("token: ", token);
      // console.log("session: ", session);

      if (session.user) {
        session.user.role = token.role;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const userById = await getUserById(token.sub);
      if (!userById) {
        return token;
      }

      token.role = userById.role;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
