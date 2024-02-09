import express from "express";
import { getStudent } from "../../controller/student/studentCon.js";
const router = express.Router();

router.get("/:userId", getStudent);

export { router as getStudentRoute };
