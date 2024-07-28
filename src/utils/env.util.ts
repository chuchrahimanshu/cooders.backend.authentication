const { env } = process as { env: { [key: string]: string } };
export const PORT = env.PORT;
export const MONGODB_URI = env.MONGODB_URI;
export const NODEMAILER_HOST = env.NODEMAILER_HOST;
export const NODEMAILER_PORT = env.NODEMAILER_PORT;
export const NODEMAILER_USER = env.NODEMAILER_USER;
export const NODEMAILER_PASS = env.NODEMAILER_PASS;
export const NODEMAILER_EMAIL = env.NODEMAILER_EMAIL;
