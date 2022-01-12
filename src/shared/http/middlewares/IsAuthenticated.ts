import auth from "@config/auth";
import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("O Token não foi enviado");
  }

  const [, token] = authHeader.split(" ");

  try {
    const decodedToken = jwt.verify(token, auth.jwt.secret);
    return next();
  } catch (error) {
      throw new AppError("O Token enviando é inválido");
  }
}
