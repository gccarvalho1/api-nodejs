/* eslint-disable linebreak-style */
import ErroBase from "./ErroBase.js";

class ReqIncorreta extends ErroBase{
  constructor(mensagem = "Um ou mais dados estão incorretos!") {
    super(mensagem, 400);
  }

};

export default ReqIncorreta;