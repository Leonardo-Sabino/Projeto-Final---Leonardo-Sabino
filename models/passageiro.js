import mongoose from "mongoose";

const passageiroSchema = new mongoose.Schema({
    bi: { type: Number, required: true },
});

export const Passageiro  = mongoose.model("passageiro", passageiroSchema);