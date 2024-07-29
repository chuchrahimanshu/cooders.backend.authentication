import { APIErrorInterface } from "src/types/handlers.types";

class APIError extends Error implements APIErrorInterface {
  statusCode: number;
  name: string;
  message: string;
  stack?: string;
  success: boolean;
  error: boolean;

  constructor(
    statusCode: number,
    name: string,
    message: string,
    stack?: string,
    success: boolean = false,
    error: boolean = true
  ) {
    super();
    this.statusCode = statusCode;
    this.name = name;
    this.message = message;
    this.stack = stack;
    this.success = success;
    this.error = error;
    if (stack) {
      this.stack = stack;
    } else {
      this.stack = new Error().stack;
    }
  }
}

export { APIError };
