import asyncHandler from "express-async-handler";
import Tracks from "../../models/TracksModel.js";

export const getTracks = asyncHandler(async (req, res) => {
  let tracks = await Tracks.find();
  if (tracks) {
    res.status(200).json(tracks);
  } else {
    res.status(404).json({ status: false, message: "Tracks not found" });
  }
});
