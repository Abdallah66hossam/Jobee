import express from "express";
import {
  loginStudent,
  registerStudent,
} from "../../controller/auth/studentAuthCon.js";
import {
  studentLoginValidation,
  studentRegisterValidation,
  validate,
} from "../../services/auth/validations.js";
import { upload } from "../../config/multer.js";

const router = express.Router();

const uploadFiles = upload.fields([
  { name: "profileImage", maxCount: 1 },
  { name: "cv", maxCount: 1 },
]);

router.post(
  "/register",
  uploadFiles,
  validate,
  studentRegisterValidation,
  registerStudent
);
router.post("/login", validate, studentLoginValidation, loginStudent);

export { router as StudentRoute };
