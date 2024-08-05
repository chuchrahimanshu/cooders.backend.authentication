import { NextFunction, Request, RequestHandler, Response } from "express";
import { Account } from "src/database/models/accounts.model";
import { Token } from "src/database/models/tokens.model";
import { asyncHandler } from "src/handlers/async.handler";
import { sendEmail } from "src/handlers/email.handler";
import { APIError } from "src/handlers/error.handler";
import { APIResponse } from "src/handlers/response.handler";
import { NODEMAILER_EMAIL } from "src/utils/env.util";
import { generateRandomOTP } from "src/utils/helper.util";

export const signUp: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, username, password, confirmPassword } =
      req.body;

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json(new APIError(400, "Password and Confirm Password must match!"));
    }

    const existingAccount = await Account.findOne({ email });
    if (existingAccount) {
      return res
        .status(400)
        .json(new APIError(400, "Email already exists, Please Sign In"));
    }

    const duplicateUsername = await Account.findOne({ username });
    if (duplicateUsername) {
      return res
        .status(400)
        .json(new APIError(400, "Email already exists, Please Sign In"));
    }

    const account = await Account.create({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    if (!account) {
      return res
        .status(500)
        .json(new APIError(500, "Something went wrong, Please try again!"));
    }

    const randomOTP = generateRandomOTP();

    const emailResponse = await sendEmail({
      from: NODEMAILER_EMAIL,
      to: email,
      subject: "Welcome to Cooders Community",
      priority: "high",
      html: `<h1>Welcome Email!</h1><p>${randomOTP}</p>`,
    });

    console.log(emailResponse);

    return res.status(201).json(new APIResponse(201, "Successfully Signed Up"));
  }
);

export const signIn: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    const account = await Account.findOne({ username });
    if (!account) {
      return res
        .status(404)
        .json(new APIError(404, "Invalid Username / Password"));
    }

    const isPasswordValid = await account.validatePassword(password);
    if (!isPasswordValid) {
      return res
        .status(404)
        .json(new APIError(404, "Invalid Username / Password"));
    }

    if (!account.emailVerificationStatus) {
      const randomOTP = generateRandomOTP();

      const emailResponse = await sendEmail({
        from: NODEMAILER_EMAIL,
        to: account.email,
        subject: "Email Verification Token",
        priority: "high",
        html: `<p>${randomOTP}</p>`,
      });

      return res
        .status(403)
        .json(new APIError(403, "Email verification pending!"));
    }

    if (account.isTFAEnabled) {
      const randomOTP = generateRandomOTP();

      const emailResponse = await sendEmail({
        from: NODEMAILER_EMAIL,
        to: account.email,
        subject: "Two Factor Authentication Token",
        priority: "high",
        html: `<p>${randomOTP}</p>`,
      });

      return res
        .status(403)
        .json(new APIError(403, "Verify Two Factor Authentication!"));
    }

    const accessToken = await account.generateAccessToken();
    const refreshToken = await account.generateRefreshToken();

    const currentTime = new Date(Date.now());
    const accessTokenExpiry = new Date(
      currentTime.getTime() + 24 * 60 * 60 * 1000
    );
    const refreshTokenExpiry = new Date(
      currentTime.getTime() + 7 * 24 * 60 * 60 * 1000
    );

    const existingTokens = await Token.findOne({ user: account._id });
    if (existingTokens) {
      existingTokens.accessToken.token = accessToken;
      existingTokens.accessToken.createdAt = currentTime;
      existingTokens.accessToken.expiresAt = accessTokenExpiry;

      existingTokens.refreshToken.token = refreshToken;
      existingTokens.refreshToken.createdAt = currentTime;
      existingTokens.refreshToken.expiresAt = refreshTokenExpiry;
      await existingTokens.save();
    } else {
      await Token.create({
        user: account._id,
        accessToken: {
          token: accessToken,
          createdAt: currentTime,
          expiresAt: accessTokenExpiry,
        },
        refreshToken: {
          token: refreshToken,
          createdAt: currentTime,
          expiresAt: refreshTokenExpiry,
        },
      });
    }

    return res.status(200).json(
      new APIResponse(200, "Successfully Signed In", {
        accessToken,
      })
    );
  }
);

export const signOut: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const account = await Account.findById(req.user?._id);
    if (!account) {
      return res
        .status(401)
        .json(new APIError(409, "Unauthorized Access Detected!"));
    }

    const token = await Token.findOne({ user: account._id });
    if (!token) {
      return res
        .status(401)
        .json(new APIError(409, "Unauthorized Access Detected!"));
    }

    token.accessToken.token = "";
    token.refreshToken.token = "";
    await token.save();

    return res
      .status(200)
      .json(new APIResponse(200, "Successfully Signed Out!"));
  }
);

export const changePassword: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password, confirmPassword } = req.body;

    if (password.toString() !== confirmPassword.toString()) {
      return res
        .status(400)
        .json(new APIError(400, "Password and Confirm Password didn't match."));
    }

    const account = await Account.findOne({ username });
    if (!account) {
      return res.status(404).json(new APIError(404, "Account not found!"));
    }

    const token = await Token.findOne({ user: account._id });
    if (!token) {
      return res
        .status(403)
        .json(new APIError(403, "User not verified to change password."));
    }

    if (!token.forgetPasswordToken.isTokenVerified) {
      return res
        .status(403)
        .json(new APIError(403, "User not verified to change password."));
    }

    account.password = password;
    await account.save();

    token.forgetPasswordToken.isTokenVerified = false;
    await token.save();

    // TODO: Send an Email that you have changed the password.
    // TODO: Also handle if user has not changed it.

    return res
      .status(200)
      .json(new APIResponse(200, "Password updated successfully!"));
  }
);
