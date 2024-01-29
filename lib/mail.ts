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
    console.log(error)
  }
  
};
