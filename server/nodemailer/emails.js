// emails.js
import { transporter } from "./mailer.config.js";
import {
  VERIFICATION_EMAIL_TEMPLATE,
    WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

const fromEmail = `"Gup Shup" <${process.env.EMAIL_USER}>`;

export const sendVerificationEmail = async (email, otp) => {
  const html = VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", otp);
  try {
    const response = await transporter.sendMail({
      from: fromEmail,
      to: email,
      subject: "Verify Your Email",
      html,
    });
    console.log("Verification email sent:", response.messageId);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

export const welcomeEmail = async (email, name) => {
  const html = WELCOME_EMAIL_TEMPLATE.replace("{fullName}", name);
  try {
    const response = await transporter.sendMail({
      from: fromEmail,
      to: email,
      subject: "Welcome to Our Service",
      html,
    });
    console.log("Welcome email sent:", response.messageId);
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};
