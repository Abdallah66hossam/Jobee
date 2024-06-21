import express from "express";
import {
  jobValidationRules,
  validate,
} from "../../services/auth/validations.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJob,
  updateJob,
} from "../../controller/jobs/jobsCon.js";
const router = express.Router();

router.get("/all", verifyToken, getAllJobs);
router.get("/:id", verifyToken, getJob);
router.post("/create", verifyToken, jobValidationRules, validate, createJob);
router.put("/update/:id", verifyToken, updateJob);
router.delete("/:id", verifyToken, deleteJob);

export { router as jobsRoute };
