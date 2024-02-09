import asyncHandler from "express-async-handler";
import Student from "../../models/StudentModel.js";
import mongoose from "mongoose";

/**-----------------------------------------------
 * @desc    Get Student
 * @route   /api/user
 * @method  GET
 * @access  public
 ------------------------------------------------*/
export const getStudent = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (userId.length < 24) {
    return res
      .status(404)
      .json({ status: false, message: "Student not found" });
  }
  const id = new mongoose.Types.ObjectId(userId);
  const student = await Student.findOne({ _id: id });
  if (student) {
    return res.status(200).json({ status: true, student });
  } else {
    return res
      .status(404)
      .json({ status: false, message: "Student not found" });
  }
});
