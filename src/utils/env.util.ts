const { env } = process as { env: { [key: string]: string } };
export const PORT = env.PORT;
export const MONGODB_URI = env.MONGODB_URI;
export const NODEMAILER_HOST = env.NODEMAILER_HOST;
export const NODEMAILER_PORT = env.NODEMAILER_PORT;
export const NODEMAILER_USER = env.NODEMAILER_USER;
export const NODEMAILER_PASS = env.NODEMAILER_PASS;
export const NODEMAILER_EMAIL = env.NODEMAILER_EMAIL;
export const JWT_ACCESS_TOKEN_EXPIRY = env.JWT_ACCESS_TOKEN_EXPIRY;
export const JWT_ACCESS_TOKEN_SECRET = env.JWT_ACCESS_TOKEN_SECRET;
export const JWT_REFRESH_TOKEN_EXPIRY = env.JWT_REFRESH_TOKEN_EXPIRY;
export const JWT_REFRESH_TOKEN_SECRET = env.JWT_REFRESH_TOKEN_SECRET;
