import express from "express"
import cors from "cors"
import { Resend } from "resend";
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = 3000
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(
  cors({
    origin: "http://localhost:8080",
  })
);

app.use(express.json())

app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body
    await sendEmail(name, email, message)
    res.json({ success: true })
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

async function sendEmail(name, email, message) {
  try {
    const { data, error } = await resend.emails.send({
      to: "victorwaribokowest@gmail.com",
      from: "Victor's Portfolio Message <onboarding@resend.dev>",
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