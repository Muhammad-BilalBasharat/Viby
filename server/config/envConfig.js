import dotenv from "dotenv";
import path from "path";

const env = process.env.ENV_MODE || "development";
let envFile = ".env";

if (env === "production") {
  envFile = ".env.production";
} else if (env === "development") {
  envFile = ".env.local";
}

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

export const {
PORT,
MONGO_URI,
JWT_SECRET,
NODE_ENV,
EMAIL_USER,
EMAIL_APP_PASSWORD,
CLOUDINARY_CLOUD_NAME,
CLOUDINARY_API_KEY,
CLOUDINARY_API_SECRET,
ARCJET_KEY,
ARCJET_ENV, 
CLIENT_URL,
RESEND_API_KEY
} = process.env;

