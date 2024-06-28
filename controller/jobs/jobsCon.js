import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import Student from "../../models/StudentModel.js";
import Jobs from "../../models/JobsModel.js";
import AppliedJobs from "../../models/AppliedJobsModel.js";

/**-----------------------------------------------
 * @desc    Get all jobs
 * @route   /api/jobs/all
 * @method  GET
 * @access  admin and student
 ------------------------------------------------*/
export const getAllJobs = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  let student = await Student.findOne({ email: decoded._id });
  let track = student.track;

  const jobs = await Jobs.find({ track });
  res.status(200).json({ status: true, data: jobs });
});

/**-----------------------------------------------
 * @desc    Create a job
 * @route   /api/jobs/create
 * @method  POST
 * @access  admin and student
 ------------------------------------------------*/
export const createJob = asyncHandler(async (req, res) => {
  let data = req.body;

  const job = await Jobs.create(data);
  if (job) {
    res
      .status(200)
      .json({ status: true, message: "The job has been created succesfully!" });
  } else {
    res.status(400).json({
      status: false,
      message: "An error has been occured while creating the job!",
    });
  }
});

/**-----------------------------------------------
 * @desc    Get a job
 * @route   /api/jobs/:id
 * @method  GET
 * @access  admin and student
 ------------------------------------------------*/
export const getJob = asyncHandler(async (req, res) => {
  let id = req.params.id;

  const job = await Jobs.findById(id);
  if (job) {
    res.status(200).json({ status: true, data: job });
  } else {
    res.status(400).json({
      status: false,
      message: "An error has been occured while getting the job!",
    });
  }
});

/**-----------------------------------------------
 * @desc    Update a job
 * @route   /api/jobs/update/:id
 * @method  PUT
 * @access  admin and student
 ------------------------------------------------*/
export const updateJob = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let updateData = req.body;

  const job = await Jobs.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (job) {
    res.status(200).json({
      status: true,
      message: "The Job has been updated succesfully!",
      data: job,
    });
  } else {
    res.status(400).json({
      status: false,
      message: "An error has been occured while updating the job!",
    });
  }
});

/**-----------------------------------------------
 * @desc    Delete a job
 * @route   /api/jobs/:id
 * @method  Delete
 * @access  admin and student
 ------------------------------------------------*/
export const deleteJob = asyncHandler(async (req, res) => {
  let id = req.params.id;

  const job = await Jobs.findByIdAndDelete(id);
  if (job) {
    res
      .status(200)
      .json({ status: true, data: "The Job has been deleted succesfully!" });
  } else {
    res.status(400).json({
      status: false,
      message: "An error has been occured while deleting the job!",
    });
  }
});

export const applyForJob = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  let student = await Student.findOne({ email: decoded.email });

  let id = req.params.id;

  let apply = await AppliedJobs.create({
    ...req.body,
    studentId: student._id.toString,
    jobId: id,
  });
  const job = await Jobs.findById(id);
  job.applied.push({ studentId: student._id });

  await job.save();
  if (job) {
    res
      .status(200)
      .json({ status: true, data: "You have applied to the job succesfully!" });
  } else {
    res.status(400).json({
      status: false,
      message: "An error has been occured while applying to the job!",
    });
  }
});
