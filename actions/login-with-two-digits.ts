"use server"

import { verifyTwoFactorToken } from '@/data/two-factor-token'
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

const loginWithTwoDigits = async (digits: string, email: string, password: string) => {
  const isVerified = await verifyTwoFactorToken(email, digits)

  if (isVerified) {
    await signIn("credentials", {
      email: email,
      password: password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } else {
    return {
      error: 'Your token is invalid'
    }
  }


}

export default loginWithTwoDigits

