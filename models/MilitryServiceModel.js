import { Schema, model } from "mongoose";

const MilitryModel = new Schema({
  MilitryService: [String],
});

const Militry = model("Militry", MilitryModel);
export default Militry;
