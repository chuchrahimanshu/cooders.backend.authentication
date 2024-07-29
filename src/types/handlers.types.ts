export interface APIResponseInterface {
  statusCode: number;
  message: string;
  data?: object;
  success: boolean;
  error: boolean;
}
