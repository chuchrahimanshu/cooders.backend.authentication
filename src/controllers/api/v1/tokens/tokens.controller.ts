import { NextFunction, Request, RequestHandler, Response } from "express";
import { Account } from "src/database/models/accounts.model";
import { Token } from "src/database/models/tokens.model";
import { asyncHandler } from "src/handlers/async.handler";
import { APIError } from "src/handlers/error.handler";
import { APIResponse } from "src/handlers/response.handler";
import { generateRandomOTP } from "src/utils/helper.util";

export const generateTFAToken: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const account = await Account.findById(req.user?._id);
    if (!account) {
      return res
        .status(401)
        .json(new APIError(401, "Unauthorized Access Detected!"));
    }

    const token = await Token.findOne({ user: account._id });
    if (!token) {
      return res
        .status(500)
        .json(new APIError(500, "Something went wrong, Token not found!"));
    }

    const OTP: string = generateRandomOTP();
    const currentTime = new Date(Date.now());
    const lastOTPTime = new Date(token.tfaToken.createdAt);
    const tfaOTPTime = new Date(lastOTPTime.getTime() + 120000);

    if (tfaOTPTime > currentTime) {
      return res
        .status(400)
        .json(new APIError(200, "OTP can only be generated after timer ends"));
    }

    token.tfaToken.token = OTP;
    token.tfaToken.createdAt = currentTime;
    token.tfaToken.expiresAt = new Date(currentTime.getTime() + 300000);
    await token.save();

    // TODO: Send OTP on User Registered Email Address

    return res
      .status(200)
      .json(new APIResponse(200, "OTP sent on registered email address"));
  }
);

export const verifyTFAToken: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const generateEmailVerificationToken: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const account = await Account.findById(req.user?._id);
    if (!account) {
      return res
        .status(401)
        .json(new APIError(401, "Unauthorized Access Detected!"));
    }

    const token = await Token.findOne({ user: account._id });
    if (!token) {
      return res
        .status(500)
        .json(new APIError(500, "Something went wrong, Token not found!"));
    }

    const OTP: string = generateRandomOTP();
    const currentTime = new Date(Date.now());
    const lastOTPTime = new Date(token.emailVerificationToken.createdAt);
    const emailOTPTime = new Date(lastOTPTime.getTime() + 120000);

    if (emailOTPTime > currentTime) {
      return res
        .status(400)
        .json(new APIError(200, "OTP can only be generated after timer ends"));
    }

    token.emailVerificationToken.token = OTP;
    token.emailVerificationToken.createdAt = currentTime;
    token.emailVerificationToken.expiresAt = new Date(
      currentTime.getTime() + 300000
    );
    await token.save();

    // TODO: Send OTP on User Registered Email Address

    return res
      .status(200)
      .json(new APIResponse(200, "OTP sent on registered email address"));
  }
);

export const verifyEmailVerificationToken: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const generateForgetPasswordToken: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const account = await Account.findById(req.user?._id);
    if (!account) {
      return res
        .status(401)
        .json(new APIError(401, "Unauthorized Access Detected!"));
    }

    const token = await Token.findOne({ user: account._id });
    if (!token) {
      return res
        .status(500)
        .json(new APIError(500, "Something went wrong, Token not found!"));
    }

    const OTP: string = generateRandomOTP();
    const currentTime = new Date(Date.now());
    const lastOTPTime = new Date(token.forgetPasswordToken.createdAt);
    const passwordOTPTime = new Date(lastOTPTime.getTime() + 120000);

    if (passwordOTPTime > currentTime) {
      return res
        .status(400)
        .json(new APIError(200, "OTP can only be generated after timer ends"));
    }

    token.forgetPasswordToken.token = OTP;
    token.forgetPasswordToken.createdAt = currentTime;
    token.forgetPasswordToken.expiresAt = new Date(
      currentTime.getTime() + 300000
    );
    token.forgetPasswordToken.isTokenVerified = false;
    await token.save();

    // TODO: Send OTP on User Registered Email Address

    return res
      .status(200)
      .json(new APIResponse(200, "OTP sent on registered email address"));
  }
);

export const verifyForgetPasswordToken: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);
