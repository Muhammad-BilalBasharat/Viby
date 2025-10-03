import { Resend } from "resend";
import { RESEND_API_KEY } from "../config/envConfig";

const resend = new Resend(RESEND_API_KEY);

export const sendMail = async ({ to, subject, html }) => {
  resend.emails
    .send({
      from: "Viby Chat <noreply@resend.dev>",
      to,
      subject,
      html,
    })
    .then((res) => console.log("✅ Email sent:", res?.id))
    .catch((err) => console.error("❌ Error sending email:", err));
};
