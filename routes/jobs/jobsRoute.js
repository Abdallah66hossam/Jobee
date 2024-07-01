import express from "express";
import {
  jobValidationRules,
  validate,
} from "../../services/auth/validations.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import {
  applyForJob,
  changeStauts,
  createJob,
  deleteJob,
  getAllJobs,
  getCompanyJobs,
  getJob,
  updateJob,
} from "../../controller/jobs/jobsCon.js";
import { bookmarkJob } from "../../controller/bookmark/index.js";
const router = express.Router();

router.get("/all", verifyToken, getAllJobs);
router.get("/company/list", verifyToken, getCompanyJobs);
router.get("/:id", verifyToken, getJob);
router.post("/create", verifyToken, jobValidationRules, validate, createJob);
router.put("/update/:id", verifyToken, updateJob);
router.delete("/:id", verifyToken, deleteJob);
router.post("/apply/:id", verifyToken, applyForJob);
router.post("/bookmark/:id", verifyToken, bookmarkJob);
router.post("/change-stauts/:id", verifyToken, changeStauts);

export { router as jobsRoute };
