import express from "express";
import { registerStudent } from "../../controller/auth/studentAuthCon.js";
import { studentValidation } from "../../services/auth/validations.js";

const router = express.Router();

router.post("/register", studentValidation, registerStudent);

export { router as StudentRoute };
