export const generateRandomOTP = (): string => {
  let OTP: string = "";

  for (let index = 0; index < 6; index++) {
    OTP += Math.floor(Math.random() * 10);
  }

  return OTP;
};
