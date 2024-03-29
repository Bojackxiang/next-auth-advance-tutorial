import {db} from "./lib/db";
import {getUserById} from "./data/user";
import {PrismaAdapter} from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {deleteTwoFactorTokenById, getTwoFactorTokenByEmail} from "@/data/two-factor-token";

export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    adapter: PrismaAdapter(db),
    callbacks: {
        async signIn({user, account}) {
            // handle oAuth
            if (account?.provider !== "credentials") return true;

            // handle credentials user
            const existingUser = await db.user.findFirst({
                where: {
                    email: user.email,
                },
            });

            if (existingUser?.emailVerified) return true;

            // if user has the two factor token, delete it
            if (existingUser && existingUser.isTwoFactorEnabled) {
                const existingTwoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
                if (existingTwoFactorToken) {
                    await deleteTwoFactorTokenById(existingTwoFactorToken.id);
                }
            }


            return true;
        },
        // 要改 session， 先改 token
        async session(params) {
            // @ts-ignore
            const {session, token} = params;

            //
            if (session.user) {
                session.user.role = token.role;
            }

            //
            return session;
        },
        async jwt({token}) {
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
    events: {
        linkAccount: async ({user}) => {
            await db.user.update({
                where: {id: user.id},
                data: {
                    emailVerified: new Date(),
                },
            });
        },
    },
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    session: {strategy: "jwt"},
    ...authConfig,
});
