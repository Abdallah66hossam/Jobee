import asyncHandler from "express-async-handler";
import Militry from "../../models/MilitryServiceModel.js";

export const getMilitry = asyncHandler(async (req, res) => {
  let militry = await Militry.find();
  if (militry) {
    res.status(200).json(militry);
  } else {
    res.status(404).json({ status: false, message: "Militry not found" });
  }
});
