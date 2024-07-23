import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

const livroSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: {
      type: String,
      required: [true, "O título do livro é obrigatório"],
    },
    editora: {
      type: String,
      required: [true, "Editora é obrigatório"],
      enum: {
        values: ["Classicos", "Casa do Código", "Alura"],
        message: "A editora {VALUE} não é permitido no nosso banco de dados.",
      },
    },
    preco: {
      type: Number,
    },
    paginas: {
      type: Number,
      required: [true, "O número de páginas é obrigatório"],
      validate: {
        validator: (valor) => {
          return valor >= 10 && valor <= 5000;
        },
        message:
          "O valor fornecido deve está entre 10 e 5000. Valor fornecido: {VALUE}",
      },
    },
    autor: autorSchema,
  },
  { versionKey: false }
);

const livro = mongoose.model("livros", livroSchema);

export { livro, livroSchema };
