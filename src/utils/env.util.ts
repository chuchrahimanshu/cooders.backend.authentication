const { env } = process as { env: { [key: string]: string } };
export const PORT = env.PORT;
export const MONGODB_URI = env.MONGODB_URI;
