import express from "express";
import {
  createCourses,
  deleteCourse,
  getAllCourses,
  getCourse,
  getCoursesMentor,
  updateCourses,
} from "../../controller/courses/coursesCon.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { upload } from "../../config/multer.js";
import { bookmarkCourse } from "../../controller/bookmark/index.js";
const router = express.Router();

const uploadFiles = upload.fields([{ name: "cover_img", maxCount: 1 }]);

router.get("/all", verifyToken, getAllCourses);
router.get("/mentor", verifyToken, getCoursesMentor);
router.get("/:id", verifyToken, getCourse);
router.post("/create", verifyToken, uploadFiles, createCourses);
router.put("/update/:id", verifyToken, updateCourses);
router.delete("/:id", verifyToken, deleteCourse);
router.post("/bookmark/:id", verifyToken, bookmarkCourse);

export { router as coursesRoute };
