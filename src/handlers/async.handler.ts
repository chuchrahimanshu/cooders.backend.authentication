// Import Section
import { NextFunction, Request, RequestHandler, Response } from "express";
import { APIError } from "./error.handler";

// Creating an Async Controller Handler - Wrapper
const asyncHandler = (requestHandler: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      requestHandler(req, res, next);
    } catch (error) {
      if (error instanceof Error) {
        return res
          .status(500)
          .json(new APIError(500, error.message, error.stack, false, true));
      } else {
        return res.status(500).json({
          message: error,
        });
      }
    }
  };
};

// Export Section
export { asyncHandler };
