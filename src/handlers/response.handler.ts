// Import Section
import { APIResponseInterface } from "src/types/handlers.types";

// Response Handler Class
class APIResponse implements APIResponseInterface {
  statusCode: number;
  message: string;
  data?: object;
  success: boolean;
  error: boolean;

  constructor(
    statusCode: number,
    message: string,
    data?: object,
    success: boolean = true,
    error: boolean = false
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = success;
    this.error = error;
  }
}

// Export Section
export { APIResponse };
