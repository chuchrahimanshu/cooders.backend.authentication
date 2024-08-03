import { ObjectId } from "mongoose";

export interface AccountSchemaInterface {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  emailVerificationStatus: boolean;
  validatePassword: (password: string) => boolean;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
}

export interface TokenSchemaInterface {
  user: ObjectId;
  accessToken: {
    token: string;
    createdAt: Date;
    expiresAt: Date;
  };
  refreshToken: {
    token: string;
    createdAt: Date;
    expiresAt: Date;
  };
  tfaToken: {
    token: string;
    createdAt: Date;
    expiresAt: Date;
  };
  emailVerificationToken: {
    token: string;
    createdAt: Date;
    expiresAt: Date;
  };
  forgetPasswordToken: {
    token: string;
    createdAt: Date;
    expiresAt: Date;
    isTokenVerified: boolean;
  };
}
