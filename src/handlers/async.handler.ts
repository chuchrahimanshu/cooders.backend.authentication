import { NextFunction, Request, RequestHandler, Response } from "express";
import { APIError } from "./error.handler";

const asyncHandler = (requestHandler: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      requestHandler(req, res, next);
    } catch (error) {
      if (error instanceof Error) {
        return res
          .status(500)
          .json(
            new APIError(
              500,
              error.name,
              error.message,
              error.stack,
              false,
              true
            )
          );
      } else {
        return res.status(500).json({
          message: error,
        });
      }
    }
  };
};

export { asyncHandler };
