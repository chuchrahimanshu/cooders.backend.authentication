// Import Section
import mongoose, { Schema } from "mongoose";
import { AccountSchemaInterface } from "src/types/database.types";

// Creating Mongoose Schema
const accountSchema: Schema<AccountSchemaInterface> =
  new mongoose.Schema<AccountSchemaInterface>(
    {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
      },
      username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
      },
      emailVerificationStatus: {
        type: Boolean,
        default: false,
      },
      isTFAEnabled: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
      collection: "accounts",
    }
  );

// Export Section
export { accountSchema };
