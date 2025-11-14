import { Resend } from "resend";
import dotenv from 'dotenv'
dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(name, email, message) {
  console.log(name)
  try {
    const { data, error } = await resend.emails.send({
      to: "victorwaribokowest@gmail.com",
      from: "Victor's Portfolio Message <portfolio@merchlyach.com>",
      subject: "You have a client message",
      text: `
        Name: ${name}
        Email: ${email}

        Message:
        ${message}`,
    });

    return { data, error };
  } catch (error) {
    console.log("Email error:", error);
    return { data: null, error };
  }
}
