import mongoose, { Schema } from "mongoose";
import { TokenSchemaInterface } from "src/types/database.types";

const tokenSchema: Schema<TokenSchemaInterface> =
  new mongoose.Schema<TokenSchemaInterface>(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true,
        unique: true,
      },
      refreshToken: {
        token: String,
        createdAt: Date,
        expiresAt: Date,
      },
      tfaToken: {
        token: String,
        createdAt: Date,
        expiresAt: Date,
      },
      emailVerificationToken: {
        token: String,
        createdAt: Date,
        expiresAt: Date,
      },
      forgetPasswordToken: {
        token: String,
        createdAt: Date,
        expiresAt: Date,
        isTokenVerified: Boolean,
      },
    },
    {
      collection: "tokens",
    }
  );

export { tokenSchema };
