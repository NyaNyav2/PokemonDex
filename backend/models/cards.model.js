import mongoose from "mongoose";

const cardsSchema = new mongoose.Schema({
   dexnum: {
     type: Number,
     required: true,
   },
  name: { type: String, required: true },
  generation: { type: Number, required: true },
  type1: { type: String, required: true },
   type2: { type: String },
   species: { type: String },
   height: { type: Number },
   weight: { type: Number },
   ability1: { type: String },
   ability2: { type: String },
   hp: { type: Number },
   attack: { type: Number },
   defense: { type: Number },
   sp_atk: { type: Number },
   sp_def: { type: Number },
   speed: { type: Number },
   total: { type: Number },
   special_group: { type: String },
});
const Cards = mongoose.model("pokemoninfo2", cardsSchema);

export default Cards;
