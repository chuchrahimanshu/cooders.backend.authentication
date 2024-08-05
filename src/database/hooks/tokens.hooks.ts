// Import Section
import { CallbackWithoutResultAndOptionalError } from "mongoose";
import { tokenSchema } from "../schemas/tokens.schema";
import { encryptUsingBcrypt } from "src/utils/helper.util";

tokenSchema.pre(
  "save",
  async function (next: CallbackWithoutResultAndOptionalError) {
    if (this.isModified("accessToken.token")) {
      this.accessToken.token = await encryptUsingBcrypt(this.accessToken.token);
    }

    if (this.isModified("refreshToken.token")) {
      this.refreshToken.token = await encryptUsingBcrypt(
        this.refreshToken.token
      );
    }

    if (this.isModified("tfaToken.token")) {
      this.tfaToken.token = await encryptUsingBcrypt(this.tfaToken.token);
    }

    if (this.isModified("emailVerificationToken.token")) {
      this.emailVerificationToken.token = await encryptUsingBcrypt(
        this.emailVerificationToken.token
      );
    }

    if (this.isModified("forgetPasswordToken.token")) {
      this.forgetPasswordToken.token = await encryptUsingBcrypt(
        this.forgetPasswordToken.token
      );
    }
    next();
  }
);
