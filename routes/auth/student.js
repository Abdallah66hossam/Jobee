import express from "express";
import {
  loginStudent,
  registerStudent,
} from "../../controller/auth/studentAuthCon.js";
import {
  studentLoginValidation,
  studentRegisterValidation,
} from "../../services/auth/validations.js";

const router = express.Router();

router.post("/register", studentRegisterValidation, registerStudent);
router.post("/login", studentLoginValidation, loginStudent);

export { router as StudentRoute };
