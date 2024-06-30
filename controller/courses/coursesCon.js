import asyncHandler from "express-async-handler";
import Course from "../../models/CoursesModel.js";
import Student from "../../models/StudentModel.js";
import jwt from "jsonwebtoken";
import Mentor from "../../models/MentorModel.js";

/**-----------------------------------------------
 * @desc    Get all courses
 * @route   /api/courses/all
 * @method  GET
 * @access  admin & student & mentor
 ------------------------------------------------*/
export const getAllCourses = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  let student = await Student.findOne({ email: decoded._id || decoded.email });
  let track = student.track;

  let courses = await Course.find({ track }).populate(
    "mentorId",
    "username profileImage"
  );

  if (courses) {
    res.status(200).json({ status: true, data: courses });
  } else {
    res.status(400).json({
      status: false,
      message: "An error has been occured while getting the courses",
    });
  }
});

/**-----------------------------------------------
 * @desc    Get courses by mentor
 * @route   /api/jobs/courses
 * @method  GET
 * @access  admin and mentor
 ------------------------------------------------*/
export const getCoursesMentor = asyncHandler(async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const mentor = await Mentor.findOne({
      email: decoded._id || decoded.email,
    });

    if (!mentor) {
      return res
        .status(404)
        .json({ status: false, message: "mentor not found" });
    }

    const courses = await Course.find({
      _id: { $in: mentor.courses },
    }).populate("mentorId", "username profileImage");

    res.status(200).json({ status: true, data: courses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Server error" });
  }
});

/**-----------------------------------------------
 * @desc    Get course
 * @route   /api/courses/:id
 * @method  GET
 * @access  admin & student & mentor
 ------------------------------------------------*/
export const getCourse = asyncHandler(async (req, res) => {
  let courseId = req.params.id;
  let course = await Course.findById(courseId).populate(
    "mentorId",
    "username profileImage"
  );
  if (course) {
    res.status(200).json({ status: true, data: course });
  } else {
    res.status(400).json({
      status: false,
      message: "An error has been occured while getting the course",
    });
  }
});

/**-----------------------------------------------
 * @desc    Create a course
 * @route   /api/courses/create
 * @method  POST
 * @access  admin & mentor
 ------------------------------------------------*/
export const createCourses = asyncHandler(async (req, res) => {
  let data = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  let mentor = await Mentor.findOne({ email: decoded._id || decoded.email });
  let mentorId = mentor._id.toString();

  let course = await Course.create({ ...data, mentorId });

  mentor.courses.push(course._id);
  await mentor.save();

  if (course) {
    res
      .status(200)
      .json({ status: true, message: "Course has been created succesfully!" });
  } else {
    res.status(400).json({
      status: false,
      message: "An error has been occured while getting the courses",
    });
  }
});

/**-----------------------------------------------
 * @desc    Update a course
 * @route   /api/courses/update
 * @method  put
 * @access  admin & mentor
 ------------------------------------------------*/
export const updateCourses = asyncHandler(async (req, res) => {
  let updateData = req.body;
  let courseId = req.params.id;

  const course = await Course.findByIdAndUpdate(courseId, updateData, {
    new: true,
  });
  if (course) {
    res.status(200).json({
      status: true,
      message: "Course has been updated succesfully!",
      data: course,
    });
  } else {
    res.status(400).json({
      status: false,
      message: "An error has been occured while updating the course",
    });
  }
});

/**-----------------------------------------------
 * @desc    Dlete a course
 * @route   /api/courses/dlete
 * @method  delete
 * @access  admin & mentor
 ------------------------------------------------*/
export const deleteCourse = asyncHandler(async (req, res) => {
  let courseId = req.params.id;

  const course = await Course.findByIdAndDelete(courseId);
  if (course) {
    res.status(200).json({
      status: true,
      message: "Course has been deleted succesfully!",
    });
  } else {
    res.status(400).json({
      status: false,
      message: "An error has been occured while deleting the course",
    });
  }
});
