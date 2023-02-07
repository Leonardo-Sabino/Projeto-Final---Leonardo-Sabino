import mongoose from "mongoose";

const navioSchema = new mongoose.Schema({
 ibm: { type: String, required: true },
  id_viagem: { type: Number, required: true },
  max_passageiros: { type: Number, required: true },
  max_carga: { type: Number, required: true }
});

export const Navio = mongoose.model('navio', navioSchema);