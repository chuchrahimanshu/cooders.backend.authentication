// Import Section
import mongoose, { Model } from "mongoose";
import { accountSchema } from "../functions/accounts.functions";
import { AccountSchemaInterface } from "src/types/database.types";

// Creating MongoDB Model Collection
const Account: Model<AccountSchemaInterface> = mongoose.model(
  "Account",
  accountSchema
);

// Export Section
export { Account };
