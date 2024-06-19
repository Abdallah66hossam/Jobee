import express from "express";
import {
  createCourses,
  deleteCourse,
  getAllCourses,
  getCourse,
  updateCourses,
} from "../../controller/courses/coursesCon.js";
import { createCourseValidation } from "../../services/auth/validations.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
const router = express.Router();

router.get("/all", verifyToken, getAllCourses);
router.get("/:id", verifyToken, getCourse);
router.post("/create", verifyToken, createCourseValidation, createCourses);
router.put("/update/:id", verifyToken, updateCourses);
router.delete("/:id", verifyToken, deleteCourse);

export { router as coursesRoute };
