import { db } from "@/lib/db";


// GET THE RESET PASSWORD TOKEN BY TOKEN
export const getPasswordResetTokenByToken = (token: string) => {
  try {
    return db.passwordResetToken.findFirst({
      where: {
        token: token,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

// GET THE RESET PASSWORD TOKEN BY EMAIL
export const getPasswordResetTokenByEmail = (email: string) => {
  try {
    return db.passwordResetToken.findFirst({
      where: {
        email: email,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

//  delete the password reset token by id
export const deletePasswordResetTokenById = (id: string) => {
  try {
    return db.passwordResetToken.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

// delete the password reset token by email & token
export const verifyPasswordResetToken = (email: string, token: string) => {
  try {
    return db.passwordResetToken.findFirst({
      where: {
        email: email,
        token: token,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};