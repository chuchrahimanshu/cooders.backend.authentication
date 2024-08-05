// Import Section
import { transporter } from "src/config/nodemailer.config";
import nodemailer from "nodemailer";
import { NodemailerEmailInterface } from "src/types/handlers.types";

// Nodemailer Send Email Handler
const sendEmail = async (
  options: NodemailerEmailInterface
): Promise<nodemailer.SentMessageInfo | void> => {
  const mailOptions = {
    from: options.from,
    to: options.to,
    subject: options.subject,
    html: options.html,
    attachments: options.attachments,
    priority: options.priority,
  };

  try {
    const emailResponse = await transporter.sendMail(mailOptions);
    return emailResponse;
  } catch (error) {
    console.error("Error while sending email: ", error);
  }
};

// Export Section
export { sendEmail };
