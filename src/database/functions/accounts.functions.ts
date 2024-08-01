import { accountSchema } from "../hooks/accounts.hooks";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import {
  JWT_ACCESS_TOKEN_EXPIRY,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRY,
  JWT_REFRESH_TOKEN_SECRET,
} from "src/utils/env.util";

accountSchema.methods.validatePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};
accountSchema.methods.generateAccessToken = async function () {
  return await JWT.sign(
    {
      _id: this._id,
      username: this.username,
    },
    JWT_ACCESS_TOKEN_SECRET,
    {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRY,
    }
  );
};
accountSchema.methods.generateRefreshToken = async function () {
  return await JWT.sign(
    {
      _id: this._id,
    },
    JWT_REFRESH_TOKEN_SECRET,
    {
      expiresIn: JWT_REFRESH_TOKEN_EXPIRY,
    }
  );
};

export { accountSchema };
