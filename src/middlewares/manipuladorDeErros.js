import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import ReqIncorreta from "../erros/ReqIncorreta.js";
import ErroDeValidacao from "../erros/ErroDeValidacao.js";
// import NaoEncontrado from "../erros/NaoEncontrado.js";

function manipuladorDeERRO(erro, req, res, next){
  if (erro instanceof mongoose.Error.CastError){
    new ReqIncorreta().enviarResposta(res);
  } else if (erro instanceof mongoose.Error.ValidationError) {
    new ErroDeValidacao(erro).enviarResposta(res);
  } else if (erro instanceof ErroBase){
    erro.enviarResposta(res);
  }else {
    new ErroBase().enviarResposta(res);
  }
};

export default manipuladorDeERRO;