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
  const student = await Student.findOne({ _id: id });
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

  let profileImage = req.files?.profileImage?.[0];
  let profileImageResult;

  if (profileImage) {
    profileImageResult = await cloudinary.v2.uploader.upload(profileImage.path);
  }
  updateData.profileImage = profileImageResult.secure_url;
  let resultCV = await cloudinary.v2.uploader.upload(req.files.cv[0].path, {
    resource_type: "raw",
    type: "upload",
    access_mode: "public",
  });
  updateData.cv = resultCV.secure_url;

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
