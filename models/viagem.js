import mongoose from "mongoose";

const ViagemSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  Porto_partida: { type: String, required: true },
  Porto_chegada: { type: String, required: true },
  Data_inicio: { type: String, required: true },
  Data_fim: { type: String, required: true },
});

export const Viagem = mongoose.model("viagem", ViagemSchema);