import asyncHandler from "express-async-handler";
import Student from "../../models/StudentModel.js";
import jwt from "jsonwebtoken";

export const bookmarkJob = asyncHandler(async (req, res) => {
  let jobId = req.params.id;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  let student = await Student.findOne({ email: decoded._id || decoded.email });

  student.myJobs.push(jobId);
  await student.save();
  res
    .status(200)
    .json({ status: true, message: "The job has been bookmarked!" });
});

export const bookmarkCourse = asyncHandler(async (req, res) => {
  let courseId = req.params.id;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  let student = await Student.findOne({ email: decoded._id || decoded.email });

  student.myCourses.push(courseId);
  await student.save();
  res
    .status(200)
    .json({ status: true, message: "The course has been bookmarked!" });
});
