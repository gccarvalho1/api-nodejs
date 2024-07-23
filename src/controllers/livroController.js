import { livro } from "../models/index.js";
import { Autor } from "../models/Autor.js";
import RequisicaoIncorreta from "../erros/ReqIncorreta.js";

class LivroController {
  static async listarLivrosPorId(req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      res.status(200).json(livroEncontrado);
    } catch (erro) {
      next(erro);
    }
  }
  static async listarLivros(req, res, next) {
    try {
      const buscaLivros = livro.find();

      req.resultado = buscaLivros;

      next();
    } catch (erro) {
      next(erro);
    }
  }
  static async cadastrarLivro(req, res, next) {
    const novoLivro = req.body;
    try {
      const autorEncontrado = await Autor.findById(novoLivro.autor);
      if (autorEncontrado) {
        const livroCompleto = {
          ...novoLivro,
          autor: { ...autorEncontrado._doc },
        };
        const livroCriado = await livro.create(livroCompleto);
        const livroResultado = await livroCriado.save();
        res.status(201).send(livroResultado.toJSON());
      } else {
        res.status(400).send({ message: "É necessário informar o autor" });
      }
    } catch (erro) {
      next(erro);
    }
  }
  static async atualizarLivro(req, res, next) {
    try {
      const id = req.params.id;
      await livro.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Livro atualizado com sucesso!" });
    } catch (erro) {
      next(erro);
    }
  }
  static async excluirLivro(req, res, next) {
    try {
      const id = req.params.id;
      await livro.findByIdAndDelete(id);
      res.status(200).json({ message: "livro excluído com sucesso" });
    } catch (erro) {
      next(erro);
    }
  }

  static async listarLivrosPorFiltro(req, res, next) {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null){
        const livrosResultado = livro
          .find(busca)
          .populate("autor");
        
        req.resultado = livrosResultado;
        next();
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }
  }
}

async function processaBusca(params){
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = params;

  let busca = {};
  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
  if (minPaginas || maxPaginas) {
    busca.paginas = {};
    if (minPaginas) busca.paginas.$gte = minPaginas;
    if (maxPaginas) busca.paginas.$lte = maxPaginas;
  }
  
  if (nomeAutor) {
    const autorAchado = await Autor.findOne({nome: nomeAutor});

    if (autorAchado !== null){
      const autorId= autorAchado._id.toString();
      busca.autor = await Autor.findById(autorId);
    } else {
      busca = null;
    };

  };
  return busca;
}


export default LivroController;