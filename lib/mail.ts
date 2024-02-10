import { Resend } from "resend";

const resend = new Resend(process.env.RESENT_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  try {
    const confirmationLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    await resend.emails.send({
      from: "onboard@resend.dev",
      to: email,
      subject: "Confirm you email",
      html: `<p>click here to confirm: <a href="${confirmationLink}">Here</a></p>`,
    });  
  } catch (error) {
    console.error(error)
  }
  
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  try {
    const confirmationLink = `http://localhost:3000/auth/new-password?token=${token}`;

    await resend.emails.send({
      from: "onboard@resend.dev",
      to: email,
      subject: "Reset your password",
      html: `<p>reset your password and click here: <a href="${confirmationLink}">Here</a></p>`,
    });  
  } catch (error) {
    console.error(error)
  }
  
};

export const sendTwoFactorToEmail = async (email: string, token: string) => {
  try {
    
    await resend.emails.send({
      from: "onboard@resend.dev",
      to: email,
      subject: "Login by click the link",
      html: `<p> Your one time password is ${token} </a></p>`,
    });
  } catch (error) {
    console.error(error)
  }

};
