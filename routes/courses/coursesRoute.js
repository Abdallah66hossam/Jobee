import express from "express";
import {
  createCourses,
  getAllCourses,
} from "../../controller/courses/coursesCon.js";
import { createCourseValidation } from "../../services/auth/validations.js";
// import { verifyToken } from "../../middlewares/verifyToken.js";
const router = express.Router();

router.get("/all", getAllCourses);
router.get("/create", createCourseValidation, createCourses);

export { router as coursesRoute };
