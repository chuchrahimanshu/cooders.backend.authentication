// Import Section
import { accountSchema } from "../schemas/accounts.schema";
import { CallbackWithoutResultAndOptionalError } from "mongoose";
import { encryptUsingBcrypt } from "src/utils/helper.util";

// Adding Event Listners on Schema Updation
accountSchema.pre(
  "save",
  async function (next: CallbackWithoutResultAndOptionalError) {
    if (this.isModified("password")) {
      this.password = await encryptUsingBcrypt(this.password);
    }
    if (this.isModified("email")) {
      this.email = await encryptUsingBcrypt(this.email);
    }
    next();
  }
);

// Export Section
export { accountSchema };
