export interface APIResponseInterface {
  statusCode: number;
  message: string;
  data?: object;
  success: boolean;
  error: boolean;
}

export interface APIErrorInterface {
  statusCode: number;
  name: string;
  message: string;
  stack?: string;
  success: boolean;
  error: boolean;
}
