const mongoose = require("mongoose");

const Pedidos = new mongoose.Schema(
  {
    id_pedido: { type: String, required: true, unique: true },
    cliente: {
      empresa: { type: String, required: true },
      pessoa: { type: String, required: true },
    },
    item: {
      codigo: { type: String, required: true, unique: true },
      descricao: { type: String, required: true },
      forma: { type: String, required: true },
      total: { type: Number, required: true },
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("Pedidos", Pedidos);
