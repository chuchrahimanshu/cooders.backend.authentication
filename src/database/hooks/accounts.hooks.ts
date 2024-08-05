// Import Section
import { accountSchema } from "../schemas/accounts.schema";
import { CallbackWithoutResultAndOptionalError } from "mongoose";
import bcryptjs from "bcryptjs";
import { BCRYPT_SALT_ROUNDS } from "src/utils/env.util";

// Adding Event Listners on Schema Updation
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

// Export Section
export { accountSchema };
