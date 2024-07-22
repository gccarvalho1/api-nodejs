import express from "express";
import conectaNaDb from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeERRO from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";

const conexao = await conectaNaDb();

conexao.on("error", (erro) => {
  console.error("Erro de conexão:", erro);
});

conexao.once("open", () => {
  console.log("Conexão bem sucedida!");
});


const app = express();
routes(app);

app.use(manipulador404);
app.use(manipuladorDeERRO);

export default app;

