import express from "express";
import {
  getStudent,
  updateStudent,
} from "../../controller/student/studentCon.js";
import { verigyToken } from "../../middlewares/verifyToken.js";
import { upload } from "../../config/multer.js";
const router = express.Router();

const uploadFiles = upload.fields([
  { name: "profileImage", maxCount: 1 },
  { name: "cv", maxCount: 1 },
]);

router.get("/:userId", verigyToken, getStudent);
router.put("/:userId", verigyToken, uploadFiles, updateStudent);

export { router as getStudentRoute };
