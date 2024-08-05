import { NextFunction, Request, RequestHandler, Response } from "express";
import { Account } from "src/database/models/accounts.model";
import { Token } from "src/database/models/tokens.model";
import { asyncHandler } from "src/handlers/async.handler";
import { sendEmail } from "src/handlers/email.handler";
import { APIError } from "src/handlers/error.handler";
import { APIResponse } from "src/handlers/response.handler";
import { NODEMAILER_EMAIL } from "src/utils/env.util";
import { generateRandomOTP } from "src/utils/helper.util";

export const generateTFAToken: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.query;

    const account = await Account.findOne({ username });
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

    const emailResponse = await sendEmail({
      from: NODEMAILER_EMAIL,
      to: account.email,
      subject: "Two Factor Authentication Token",
      priority: "high",
      html: `<p>${OTP}</p>`,
    });

    return res
      .status(200)
      .json(new APIResponse(200, "OTP sent on registered email address"));
  }
);

export const verifyTFAToken: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, otp } = req.query;

    const account = await Account.findOne({ username });
    if (!account) {
      return res
        .status(401)
        .json(new APIError(401, "Unauthorized Access Detected!"));
    }

    const token = await Token.findOne({ user: account._id });
    if (!token) {
      return res
        .status(401)
        .json(new APIError(401, "Unauthorized Access Detected!"));
    }

    const currentTime = new Date(Date.now());
    const otpExpireTime = new Date(token.tfaToken.expiresAt);

    if (otpExpireTime < currentTime) {
      return res
        .status(403)
        .json(
          new APIError(
            403,
            "Please validate OTP with in 5 minutes, OTP is expired!"
          )
        );
    }

    if (token.tfaToken.token.toString() !== otp?.toString()) {
      return res
        .status(400)
        .json(new APIError(400, "Please enter a valid OTP."));
    }

    const accessToken = await account.generateAccessToken();
    const refreshToken = await account.generateRefreshToken();

    const accessTokenExpiry = new Date(
      currentTime.getTime() + 24 * 60 * 60 * 1000
    );
    const refreshTokenExpiry = new Date(
      currentTime.getTime() + 7 * 24 * 60 * 60 * 1000
    );

    token.accessToken.token = accessToken;
    token.accessToken.createdAt = currentTime;
    token.accessToken.expiresAt = accessTokenExpiry;

    token.refreshToken.token = refreshToken;
    token.refreshToken.createdAt = currentTime;
    token.refreshToken.expiresAt = refreshTokenExpiry;
    await token.save();

    return res.status(200).json(
      new APIResponse(200, "Successfully Signed In", {
        accessToken,
      })
    );
  }
);

export const generateEmailVerificationToken: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.query;

    const account = await Account.findOne({ username });
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

    const emailResponse = await sendEmail({
      from: NODEMAILER_EMAIL,
      to: account.email,
      subject: "Email Verification Token",
      priority: "high",
      html: `<p>${OTP}</p>`,
    });

    return res
      .status(200)
      .json(new APIResponse(200, "OTP sent on registered email address"));
  }
);

export const verifyEmailVerificationToken: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, otp } = req.query;

    const account = await Account.findOne({ username });
    if (!account) {
      return res
        .status(401)
        .json(new APIError(401, "Unauthorized Access Detected!"));
    }

    const token = await Token.findOne({ user: account._id });
    if (!token) {
      return res
        .status(401)
        .json(new APIError(401, "Unauthorized Access Detected!"));
    }

    const currentTime = new Date(Date.now());
    const otpExpireTime = new Date(token.emailVerificationToken.expiresAt);

    if (otpExpireTime < currentTime) {
      return res
        .status(403)
        .json(
          new APIError(
            403,
            "Please validate OTP with in 5 minutes, OTP is expired!"
          )
        );
    }

    if (token.emailVerificationToken.token.toString() !== otp?.toString()) {
      return res
        .status(400)
        .json(new APIError(400, "Please enter a valid OTP."));
    }

    account.emailVerificationStatus = true;
    await account.save();

    return res
      .status(200)
      .json(new APIResponse(200, "Email verification successfull!"));
  }
);

export const generateForgetPasswordToken: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.query;

    const account = await Account.findOne({ username });
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

    const emailResponse = await sendEmail({
      from: NODEMAILER_EMAIL,
      to: account.email,
      subject: "Forget Password Token",
      priority: "high",
      html: `<p>${OTP}</p>`,
    });

    return res
      .status(200)
      .json(new APIResponse(200, "OTP sent on registered email address"));
  }
);

export const verifyForgetPasswordToken: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, otp } = req.query;

    const account = await Account.findOne({ username });
    if (!account) {
      return res
        .status(401)
        .json(new APIError(401, "Unauthorized Access Detected!"));
    }

    const token = await Token.findOne({ user: account._id });
    if (!token) {
      return res
        .status(401)
        .json(new APIError(401, "Unauthorized Access Detected!"));
    }

    const currentTime = new Date(Date.now());
    const otpExpireTime = new Date(token.forgetPasswordToken.expiresAt);

    if (otpExpireTime < currentTime) {
      return res
        .status(403)
        .json(
          new APIError(
            403,
            "Please validate OTP with in 5 minutes, OTP is expired!"
          )
        );
    }

    if (token.forgetPasswordToken.token.toString() !== otp?.toString()) {
      return res
        .status(400)
        .json(new APIError(400, "Please enter a valid OTP."));
    }

    token.forgetPasswordToken.isTokenVerified = true;
    await token.save();

    return res
      .status(200)
      .json(new APIResponse(200, "OTP validated successfully"));
  }
);
