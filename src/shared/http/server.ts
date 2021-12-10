import "reflect-metadata";
import "express-async-errors"
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import routes from "./routes";
import AppError from "@shared/errors/AppError";
import "@shared/typeorm";

const port = 3333;

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
      });
    }
    return response.status(500).json({
      status: "erro",
      message: "Erro interno do servidor!",
    });
  }
);

app.listen(port, () => {
  console.log(`O servidor está executando na porta ${port}`);
});