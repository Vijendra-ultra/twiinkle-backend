import type { Request, Response, NextFunction } from "express";
interface AppError extends Error {
  statusCode?: number;
  status?: number;
}

//next param should exist in error handling functions
function customErrorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let error: AppError;

  if (err instanceof Error) {
    error = err as AppError;
  } else {
    error = new Error("Internal Server Error");
  }

  console.log("Error", {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
  });

  const statusCode = error.statusCode || error.status || 500;

  res.status(statusCode).json({
    success: false,
    message: error.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
}
module.exports = customErrorHandler;
