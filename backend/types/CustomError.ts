export class CustomError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    // Keep the right stack trace
    //if (typeof Error.captureStackTrace === 'function') {
    Error.captureStackTrace(this, this.constructor);
    //}
  }
}
