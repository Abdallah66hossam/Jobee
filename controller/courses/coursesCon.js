import asyncHandler from "express-async-handler";
import Course from "../../models/CoursesModel.js";

/**-----------------------------------------------
 * @desc    Get all courses
 * @route   /api/courses/all
 * @method  GET
 * @access  admin & student & mentor
 ------------------------------------------------*/
export const getAllCourses = asyncHandler(async (req, res) => {
  let courses = await Course.find({});
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
 * @desc    Create a course
 * @route   /api/courses/create
 * @method  POST
 * @access  admin & mentor
 ------------------------------------------------*/
export const createCourses = asyncHandler(async (req, res) => {
  let data = req.body;

  let courses = await Course.create(data);

  if (courses) {
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
