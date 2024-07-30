import mongoose, { Model } from "mongoose";
import { accountSchema } from "../functions/accounts.functions";
import { AccountSchemaInterface } from "src/types/database.types";

const Account: Model<AccountSchemaInterface> = mongoose.model(
  "Account",
  accountSchema
);

export { Account };
