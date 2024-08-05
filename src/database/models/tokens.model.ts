// Import Section
import mongoose, { Model } from "mongoose";
import { TokenSchemaInterface } from "src/types/database.types";
import { tokenSchema } from "../schemas/tokens.schema";

// Creating MongoDB Model Collection
const Token: Model<TokenSchemaInterface> = mongoose.model("Token", tokenSchema);

// Export Section
export { Token };
