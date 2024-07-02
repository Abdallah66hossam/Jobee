import asyncHandler from "express-async-handler";
import Student from "../../models/StudentModel.js";
import jwt from "jsonwebtoken";

export const bookmarkJob = asyncHandler(async (req, res) => {
  let jobId = req.params.id;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  let student = await Student.findOne({ email: decoded._id || decoded.email });

  let isExist = false;

  student.myJobs.forEach((st) => {
    if (st.toString() == jobId) {
      isExist = true;
      return;
    }
  });

  if (!isExist) {
    student.myJobs.push(jobId);
    await student.save();
    res
      .status(200)
      .json({ status: true, message: "The job has been bookmarked!" });
  } else {
    student.myJobs = student.myJobs.filter((id) => id.toString() != jobId);
    await student.save();
    return res
      .status(200)
      .json({ status: true, message: "You have unbookmarked the job!" });
  }
});

export const bookmarkCourse = asyncHandler(async (req, res) => {
  let courseId = req.params.id;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  let student = await Student.findOne({ email: decoded._id || decoded.email });

  let isExist = false;

  student.myCourses.forEach((st) => {
    if (st.toString() == courseId) {
      isExist = true;
      return;
    }
  });

  if (!isExist) {
    student.myCourses.push(courseId.toString());
    await student.save();
    res
      .status(200)
      .json({ status: true, message: "The course has been bookmarked!" });
  } else {
    student.myCourses = student.myCourses.filter(
      (id) => id.toString() != courseId
    );
    await student.save();
    return res
      .status(200)
      .json({ status: true, message: "You have unbookmarked the course!" });
  }
});
