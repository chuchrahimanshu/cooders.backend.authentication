import mongoose, { Model } from "mongoose";
import { accountSchema } from "../schemas/accounts.schema";
import { AccountSchemaInterface } from "src/types/database.types";

const Account: Model<AccountSchemaInterface> = mongoose.model(
  "Account",
  accountSchema
);

export { Account };
