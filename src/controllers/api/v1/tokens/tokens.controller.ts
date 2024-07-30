import { NextFunction, Request, RequestHandler, Response } from "express";
import { asyncHandler } from "src/handlers/async.handler";

export const generateTFAToken: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const verifyTFAToken: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const generateEmailVerificationToken: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const verifyEmailVerificationToken: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const generateForgetPasswordToken: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const verifyForgetPasswordToken: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);
