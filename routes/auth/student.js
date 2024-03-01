import express from "express";
import {
  loginStudent,
  registerStudent,
} from "../../controller/auth/studentAuthCon.js";
import {
  studentLoginValidation,
  studentRegisterValidation,
} from "../../services/auth/validations.js";
import { upload } from "../../config/multer.js";

const router = express.Router();

router.post(
  "/register",
  upload.single("profileImage"),
  studentRegisterValidation,
  registerStudent
);
router.post("/login", studentLoginValidation, loginStudent);

export { router as StudentRoute };
