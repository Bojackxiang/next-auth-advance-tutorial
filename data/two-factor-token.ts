import { db } from "@/lib/db";

import { randomInt } from 'crypto'

//
export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    return await db.twoFactorToken.findFirst({
      where: {
        token,
      },
    });
  } catch (error) {
    return null;
  }
};

export const getTwoFactorTokenById = async (id: string) => {
  try {
    return await db.twoFactorToken.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    return null;
  }
};


export const deleteTwoFactorTokenById = async (id: string) => {
  try {
    return await db.twoFactorToken.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateTwoFactorTokenById = async (id: string, token: string) => {
  try {
    return await db.twoFactorToken.update({
      where: {
        id,
      },
      data: {
        token,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }

};

export const createTwoFactorTokenByEmail = async (email: string) => {
  // 
  const oneTimePassword = randomInt(100000, 999999)
  try {
    const existingUser = await db.user.findUnique({
      where: {
        email: email
      }
    })

    if (existingUser == null) {
      console.error("User is not found")
      return null
    }

    const userEmail = existingUser.email;

    if (userEmail == null) {
      console.error("Current user dose not has email")
      return null
    }

    const twoFactorTokenByEmail = await db.twoFactorToken.findFirst({
      where: {
        email: userEmail
      }
    });

    // if not corresponding email found, create new two factor token
    console.log({ oneTimePassword })
    if (twoFactorTokenByEmail === null) {
      console.log({ twoFactorTokenByEmail })
      return await db.twoFactorToken.create({
        data: {
          email: userEmail,
          token: `${oneTimePassword}`,
          expires: new Date(new Date().getTime() + +3600 * 10000),
        },
      });
    } else {
      return await db.twoFactorToken.update({
        where: {
          id: twoFactorTokenByEmail.id,
        },
        data: {
          token: `${oneTimePassword}`,
        }
      })
    }


  } catch (error) {
    console.error(error);
    return null;
  }
};

export const verifyTwoFactorToken = async (email: string, token: string) => {
  try {

    const foundTokenByEmail = await db.twoFactorToken.findFirst({
      where: {
        email,
        token
      }
    })

    if (foundTokenByEmail === null) {
      return false;
    }

    await deleteTwoFactorTokenById(foundTokenByEmail.id)

    return true;

  } catch (error) {
    console.error(error);
    return false;
  }
}

export const getTwoFactorTokenByEmail = async (email: string | null) => {
  if (!email) {
    return null
  }
  return await db.twoFactorToken.findFirst({
    where: {
      email,
    }
  })
}
