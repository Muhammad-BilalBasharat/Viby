import { sendMail } from "./mailer.config.js";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

const FROM_NAME = "Viby Chat"; 
const FROM_EMAIL = "noreply@resend.dev"; 

export const sendVerificationEmail = (email, otp) => {
  const html = VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", otp);

  sendMail({
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to: email,
    subject: "Verify Your Email",
    html,
  });
};

export const welcomeEmail = (email, name) => {
  const html = WELCOME_EMAIL_TEMPLATE.replace("{fullName}", name);

  sendMail({
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to: email,
    subject: "Welcome to Viby Chat 🎉",
    html,
  });
};
