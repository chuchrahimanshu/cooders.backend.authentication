import { NextFunction, Request, RequestHandler, Response } from "express";
import { asyncHandler } from "src/handlers/async.handler";

export const googleOAuth: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const githubOAuth: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const linkedinOAuth: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);
