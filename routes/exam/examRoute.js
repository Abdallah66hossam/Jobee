import express from "express";
import {
  createExam,
  getAllQuestions,
  getExamByTrack,
  submitExam,
  getExamById,
} from "../../controller/exam/examCon.js";
import { createExamValidation } from "../../services/auth/validations.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
const router = express.Router();

router.get("/", verifyToken, getExamByTrack);
router.get("/all", verifyToken, getAllQuestions);
router.post("/create", verifyToken, createExamValidation, createExam);
router.post("/submit/:id", verifyToken, submitExam);
router.get("/:id", verifyToken, getExamById);

export { router as examRoute };
