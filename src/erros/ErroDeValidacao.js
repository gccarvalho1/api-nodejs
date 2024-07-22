import ReqIncorreta from "./ReqIncorreta.js";

class ErroDeValidacao extends ReqIncorreta{
  constructor(erro) {
    const mensangensErro = Object.values(erro.errors).map(erro=> erro.message).join(";");

    super(`Os seguintes erros foram encontrados: ${mensangensErro}`);
  }

};

export default ErroDeValidacao;