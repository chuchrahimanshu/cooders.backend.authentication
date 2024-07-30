import mongoose, { Schema } from "mongoose";
import { AccountSchemaInterface } from "src/types/database.types";

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
    },
    {
      timestamps: true,
      collection: "accounts",
    }
  );

export { accountSchema };
