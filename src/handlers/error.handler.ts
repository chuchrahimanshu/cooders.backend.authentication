// Import Section
import { APIErrorInterface } from "src/types/handlers.types";

// Error Handler Class
class APIError extends Error implements APIErrorInterface {
  statusCode: number;
  message: string;
  stack?: string;
  success: boolean;
  error: boolean;

  constructor(
    statusCode: number,
    message: string,
    stack?: string,
    success: boolean = false,
    error: boolean = true
  ) {
    super();
    this.statusCode = statusCode;
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

// Export Section
export { APIError };
