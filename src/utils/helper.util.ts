// Import Section
import bcryptjs from "bcryptjs";
import { BCRYPT_SALT_ROUNDS } from "./env.util";

// Helper Functions
export const generateRandomOTP = (): string => {
  let OTP: string = "";

  for (let index = 0; index < 6; index++) {
    OTP += Math.floor(Math.random() * 10);
  }

  return OTP;
};

export const encryptUsingBcrypt = async (value: string) => {
  const salt = await bcryptjs.genSalt(Number(BCRYPT_SALT_ROUNDS));
  return await bcryptjs.hash(value, salt);
};
