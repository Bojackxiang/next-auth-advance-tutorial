declare module "next-auth" {
  interface Session {
    /** The user's postal address. */
    user: ExtendedUser
  }
}

export type ExtendedUser = DefaultSession['user'] & {
  role: 'ADMIN' | 'USER'
}