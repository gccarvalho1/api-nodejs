import mongoose from "mongoose";
import { Autor } from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class autorController {
  static async listarAutorPorId(req, res, next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await Autor.findById(id);

      if(autorEncontrado === null){
        next(new NaoEncontrado("ID do Autor não Localizado."));
      } else {
        res.status(200).json(autorEncontrado);
      }
    } catch (erro) {
      next(erro);
    }
  };
  static async listarAutores(req, res, next) {
    try {
      const listaAutor = Autor.find({});
      req.resultado = listaAutor;
      next();
    } catch (erro) {
      next(erro);
    }
  };
  static async cadastrarAutor(req, res, next) {
    try {
      let autorNew = new Autor(req.body);
      const novoAutor = await autorNew.save();
      res.status(201).json({message: "Autor criado com sucesso", Autor: novoAutor});
    } catch (erro) {
      next(erro);
    }
  };
  static async atualizarAutor(req, res) {
    try {
      const id = req.params.id;
      await Autor.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Autor atualizado com sucesso!"});
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na atualização do livro `});
    }
  } ;
  static async excluirAutor (req, res) {
    try {
      const id = req.params.id;
      await Autor.findByIdAndDelete(id);
      res.status(200).json({ message: "Autor excluído com sucesso" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na exclusão` });
    }
  };
};


export default autorController;
