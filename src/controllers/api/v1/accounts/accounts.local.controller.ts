import { NextFunction, Request, RequestHandler, Response } from "express";
import { Account } from "src/database/models/accounts.model";
import { asyncHandler } from "src/handlers/async.handler";
import { APIError } from "src/handlers/error.handler";
import { APIResponse } from "src/handlers/response.handler";

export const signUp: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, username, password } = req.body;

    const existingAccount = await Account.findOne({ email });
    if (existingAccount) {
      return res
        .status(400)
        .json(
          new APIError(
            400,
            "Existing Account",
            "Email already exists, Please Sign In"
          )
        );
    }

    const duplicateUsername = await Account.findOne({ username });
    if (duplicateUsername) {
      return res
        .status(400)
        .json(
          new APIError(
            400,
            "Duplicate Username",
            "Email already exists, Please Sign In"
          )
        );
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
        .json(
          new APIError(
            500,
            "Database Error",
            "Something went wrong, Please try again!"
          )
        );
    }

    // TODO: SEND EMAIL OF SUCCESSFULL REGISTRATION

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
        .json(
          new APIError(404, "Account not found!", "Invalid Username / Password")
        );
    }

    // TODO: CHANGE THIS WHEN ENCRYPTION IS APPLIED
    if (password.toString() !== account.password.toString()) {
      return res
        .status(404)
        .json(
          new APIError(404, "Account not found!", "Invalid Username / Password")
        );
    }

    // TODO: APPLY JWT AUTHENTICATION

    // TODO: SEND ACCESSTOKEN IN RESPONSE
    return res.status(200).json(new APIResponse(200, "Successfully Signed In"));
  }
);

export const signOut: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const changePassword: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);
