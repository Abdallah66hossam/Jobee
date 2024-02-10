import { Schema, model } from "mongoose";

const TracksModel = new Schema({
  tracks: [String],
});

const Tracks = model("track", TracksModel);
export default Tracks;
