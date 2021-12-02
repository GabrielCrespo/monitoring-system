import { Router } from "express";

const routes = Router();

routes.get("/", (request, response) => {
  return response.json({ message: "Novamente essa merda!" });
});

export default routes;