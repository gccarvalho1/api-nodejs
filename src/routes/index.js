import express from "express";
import livros from "./livroRoutes.js";
import autores from "./autoresRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => res.status(200).send("Curso de Node.js"));
   
  app.use(express.json());
  app.use(livros, autores);

};

export default routes;