import asyncHandler from "express-async-handler";
import { Exam, Question } from "../../models/ExamModel.js";
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
 * @desc    Get all exams
 * @route   /api/exam/all
 * @method  GET
 * @access  admin and student
 ------------------------------------------------*/
export const getExamByTrack = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  let student = await Student.findOne({ email: decoded._id });
  let studentTrack = student.track;

  const exams = await Exam.find({});

  let exam = exams.find((ex) => ex.type == studentTrack);
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
    await Exam.create({ type: req.body.type, exam: req.body.exam });

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
  const userAnswers = req.body;
  // get user
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  let student = await Student.findOne({ email: decoded._id });
  let studentTrack = student.track;

  // get all exams and then find the exam by track
  let allExams = await Exam.find({});
  let examsByTrack = allExams.find((ex) => ex.type == studentTrack);
  let examQues = examsByTrack.exam;

  let score = 0;
  // get the original question, then find the correct option, then compare each other and increase score by 10
  for (const question of userAnswers) {
    let origignalQue = examQues.find((que) => que.id == question.que_id);
    let correctAns = origignalQue.options.find((option) => option.isCorrect);
    if (question.ans_id == correctAns._id.toString()) {
      score += 10;
    }
  }
  student.score = score;

  res.status(200).json({
    status: true,
    data: { message: "You have submmited the exam successfully!", score },
  });
});
