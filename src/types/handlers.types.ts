export interface APIResponseInterface {
  statusCode: number;
  message: string;
  data?: object;
  success: boolean;
  error: boolean;
}

export interface APIErrorInterface {
  statusCode: number;
  message: string;
  stack?: string;
  success: boolean;
  error: boolean;
}

export interface NodemailerEmailInterface {
  from: string;
  to: string;
  subject: string;
  html: string;
  attachments?: Array<{
    filename: string;
    path: string;
    contentType?: string;
  }>;
  priority: "high" | "normal" | "low";
}
