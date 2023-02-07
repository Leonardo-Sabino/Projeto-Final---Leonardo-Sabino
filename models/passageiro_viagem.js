import mongoose from "mongoose";

const passageiroViagemSchema = new mongoose.Schema({
  ibm: { type: String, required: true },
  bi_passageiro: { type: Number, required: true },
  id_viagem: { type: Number, required: true }
});

export const Passageiro_viagem = mongoose.model("Passageiro_viagem", passageiroViagemSchema);