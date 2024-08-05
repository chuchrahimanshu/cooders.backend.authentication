// Import Section
import nodemailer, { Transporter } from "nodemailer";
import {
  NODEMAILER_HOST,
  NODEMAILER_PASS,
  NODEMAILER_PORT,
  NODEMAILER_USER,
} from "src/utils/env.util";

// Creating Transporter for Sending Emails
const transporter: Transporter = nodemailer.createTransport({
  host: NODEMAILER_HOST,
  port: parseInt(NODEMAILER_PORT, 10),
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_PASS,
  },
});

// Export Section
export { transporter };
