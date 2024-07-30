import mongoose, { Model } from "mongoose";
import { TokenSchemaInterface } from "src/types/database.types";
import { tokenSchema } from "../schemas/tokens.schema";

const Token: Model<TokenSchemaInterface> = mongoose.model("Token", tokenSchema);

export { Token };
