import asyncHandler from "express-async-handler";
import { Exam } from "../../models/ExamModel.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import Student from "../../models/StudentModel.js";

/**-----------------------------------------------
 * @desc    Get all exams
 * @route   /api/exam/all
 * @method  GET
 * @access  admin and student
 ------------------------------------------------*/
export const getAllQuestions = asyncHandler(async (req, res) => {
  const questions = await Exam.find({});
  res.status(200).json({ status: true, data: questions });
});

/**-----------------------------------------------
 * @desc    Get exam by track
 * @route   /api/exam
 * @method  GET
 * @access  admin and student
 ------------------------------------------------*/
export const getExamByTrack = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  let student = await Student.findOne({ email: decoded.email });
  let studentTrack = student.track;

  const exams = await Exam.find({});

  let exam = exams.filter((ex) => ex.type == studentTrack);
  res.status(200).json({ status: true, data: exam });
});
/**-----------------------------------------------
 * @desc    Get exam by id
 * @route   /api/exam/:id
 * @method  GET
 * @access  admin and student
 ------------------------------------------------*/
export const getExamById = asyncHandler(async (req, res) => {
  let examId = req.params.id;
  let exam = await Exam.findById(examId);

  // let exam = exams.filter((ex) => ex.type == studentTrack);
  res.status(200).json({ status: true, data: exam });
});

/**-----------------------------------------------
 * @desc    Create exam
 * @route   /api/exam/create
 * @method  POST
 * @access  Mentor and Admin
 ------------------------------------------------*/
export const createExam = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: false, errors: errors.array() });
  }
  try {
    await Exam.create({
      name: req.body.name,
      type: req.body.type,
      exam: req.body.exam,
      score: 0,
    });

    res
      .status(201)
      .json({ status: true, message: "Exam has been created successfully!" });
  } catch (err) {
    res.status(400).json({
      status: false,
      data: "An error has been accured while creating an exam.",
    });
  }
});

/**-----------------------------------------------
 * @desc    Submit exam
 * @route   /api/exam/submit
 * @method  POST
 * @access  student
 ------------------------------------------------*/
export const submitExam = asyncHandler(async (req, res) => {
  const userAnswers = req.body.answers;
  const examId = req.params.id;
  // get user
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  let student = await Student.findOne({ email: decoded.email });

  // get all exams and then find the exam by track
  let examById = await Exam.findById(examId);
  let examQues = examById.exam;

  let score = 0;
  // get the original question, then find the correct option, then compare each other and increase score by 10
  for (const question of userAnswers) {
    let origignalQue = examQues.find((que) => que.id == question.que_id);
    let correctAns = origignalQue.options.find((option) => option.isCorrect);
    if (question.ans_id == correctAns._id.toString()) {
      score += 10;
    }
  }
  let newScore = (student.score || 0) + score;
  await Student.findByIdAndUpdate(student, { score: newScore }, { new: true });
  await Exam.findByIdAndUpdate(examId, { score: 1 }, { new: true });

  res.status(200).json({
    status: true,
    data: {
      message: "You have submmited the exam successfully!",
      score: score,
    },
  });
});
