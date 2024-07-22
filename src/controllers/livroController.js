import { livro } from "../models/Livro.js";
import { Autor } from "../models/Autor.js"; 


class LivroController {
  static async listarLivrosPorId(req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      res.status(200).json(livroEncontrado);
    } catch (erro) {
      next(erro);
    }
  };
  static async listarLivros(req, res, next) {
    try {
      const listaLivros = await livro.find({});
      res.status(200).json(listaLivros);
    } catch (erro) {
      next(erro);
    }
  };
  static async cadastrarLivro(req, res, next) {

    const novoLivro = req.body;
    try {
      const autorEncontrado = await Autor.findById(novoLivro.autor);
      if (autorEncontrado){
        const livroCompleto =  { ...novoLivro, autor: { ...autorEncontrado._doc } };
        const livroCriado = await livro.create(livroCompleto);
        // res.status(201).json({message: "Livro criado com sucesso", livro: livroCriado});
        const livroResultado = await livroCriado.save();
        res.status(201).send(livroResultado.toJSON());
      } else {
        res.status(400).send({message: "É necessário informar o autor"});
      }

    } catch (erro) {
      next(erro);
    }
  };
  static async atualizarLivro(req, res, next) {
    try {
      const id = req.params.id;
      await livro.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Livro atualizado com sucesso!"});
    } catch (erro) {
      next(erro);
    }
  } ;
  static async excluirLivro (req, res, next) {
    try {
      const id = req.params.id;
      await livro.findByIdAndDelete(id);
      res.status(200).json({ message: "livro excluído com sucesso" });
    } catch (erro) {
      next(erro);
    }
  };

  static async listarLivrosPorEditora (req, res, next)  {
    const editora = req.query.editora;
    try{
      const livrosPorEditora = await livro.find({ editora: editora });
      res.status(200).json(livrosPorEditora);
    } catch (erro) {
      next(erro);
    }
  };
};


export default LivroController;


