import { Request, Response, NextFunction } from "express";
import "express-async-errors";
import HttpError from "./httpError";

const asyncErrors = (app: any) => {
  app.use((error: HttpError, request: Request, response: Response, next: NextFunction) => {
    response.status(error.status || 500).json({
      status: "Error",
      message: error.message,
    });
  });
};

export default asyncErrors;
