import express from "express";
import { getStudent } from "../../controller/student/studentCon.js";
import { verigyToken } from "../../middlewares/verifyToken.js";
const router = express.Router();

router.get("/:userId", verigyToken, getStudent);

export { router as getStudentRoute };
