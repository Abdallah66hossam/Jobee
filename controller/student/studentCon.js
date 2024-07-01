import asyncHandler from "express-async-handler";
import Student from "../../models/StudentModel.js";
import mongoose from "mongoose";
import cloudinary from "cloudinary";

/**-----------------------------------------------
 * @desc    Get Student
 * @route   /api/student
 * @method  GET
 * @access  admin and student
 ------------------------------------------------*/
export const getStudent = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (userId.length < 24) {
    return res
      .status(404)
      .json({ status: false, message: "Student not found" });
  }
  const id = new mongoose.Types.ObjectId(userId);
  const student = await Student.findOne({ _id: id })
    .populate("myJobs")
    .populate("myCourses");
  if (student) {
    return res.status(200).json({ status: true, student });
  } else {
    return res
      .status(404)
      .json({ status: false, message: "Student not found" });
  }
});

/**-----------------------------------------------
 * @desc    Update Student
 * @route   /api/student/:userID
 * @method  PUT
 * @access  admin and student
 ------------------------------------------------*/
export const updateStudent = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const updateData = req.body;

  let profileImage = req.body.profileImage
    ? JSON.parse(req.body?.profileImage)
    : "";
  let resultProfile;
  if (profileImage) {
    resultProfile = await cloudinary.v2.uploader.upload(profileImage.path);
  }
  updateData.profileImage = resultProfile.secure_url;

  const student = await Student.findByIdAndUpdate(userId, updateData, {
    new: true,
  });
  if (!student) {
    return res
      .status(404)
      .json({ status: false, message: "Student not found" });
  }
  res.status(200).json({ status: true, data: student });
});
