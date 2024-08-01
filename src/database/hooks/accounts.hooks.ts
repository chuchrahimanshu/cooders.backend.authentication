import { accountSchema } from "../schemas/accounts.schema";
import { CallbackWithoutResultAndOptionalError } from "mongoose";
import bcryptjs from "bcryptjs";
import { BCRYPT_SALT_ROUNDS } from "src/utils/env.util";

accountSchema.pre(
  "save",
  async function (next: CallbackWithoutResultAndOptionalError) {
    if (this.isModified("password")) {
      const salt = await bcryptjs.genSalt(Number(BCRYPT_SALT_ROUNDS));
      this.password = await bcryptjs.hash(this.password, salt);
    }
    next();
  }
);

export { accountSchema };
