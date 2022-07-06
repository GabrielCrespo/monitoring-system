import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import routes from "./routes";
import AppError from "@shared/errors/AppError";
import "@shared/typeorm";
import { errors } from "celebrate";
import uploadConfig from "@config/upload";
// import swaggerUI from "swagger-ui-express";
// import swaggerJsDoc from "swagger-jsdoc";

const port = 3333;

// const options = {
//   definition: {
//     swagger: "2.0",
//     info: {
//       title: "Library API",
//       version: "1.0.0",
//       description: "Monitoring system",
//     },
//     servers: [
//       {
//         url: "http://localhost:3080",
//       },
//     ],
//   },
//   apis: ["**/*.{ts,js"],
// };

// const specs = swaggerJsDoc(options);

const app = express();
// app.use("/api", swaggerUI.serve, swaggerUI.setup(specs));

app.use(cors());
app.use(express.json());
app.use("/files", express.static(uploadConfig.directory));
app.use(routes);

app.use(errors());

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
      //message: error.stack,
    });
  }
);

app.listen(port, () => {
  console.log(`O servidor está executando na porta ${port}`);
});
