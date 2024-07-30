import { NextFunction, Request, RequestHandler, Response } from "express";
import { asyncHandler } from "src/handlers/async.handler";

export const signUp: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const signIn: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const signOut: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const changePassword: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);
