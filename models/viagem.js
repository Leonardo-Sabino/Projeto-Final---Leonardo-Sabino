const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  id_viagem: { type: Number, required: true },
  Porto_partida: { type: String, required: true },
  Porto_chegada: { type: String, required: true },
  Data_inicio: { type: String, required: true },
  Data_fim: { type: String, required: true },
  id_navio: { type: Number, required: true }
});

module.exports = mongoose.model("viagem", tripSchema);