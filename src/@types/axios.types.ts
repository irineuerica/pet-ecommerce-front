import { AxiosError } from 'axios';

export interface AxiosCustomError
  extends AxiosError<{
    message: string;
    error: string;
    statusCode: number;
  }> {
  error: string;
  message: string;
  statusCode: number;
}
