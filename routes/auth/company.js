import express from "express";
import { upload } from "../../config/multer.js";
import { registerCompany } from "../../controller/auth/companyAuthCon.js";
import { validate, validateCompany } from "../../services/auth/validations.js";

const router = express.Router();

const uploadFiles = upload.fields([{ name: "profileImage", maxCount: 1 }]);

router.post(
  "/register",
  uploadFiles,
  validate,
  validateCompany,
  registerCompany
);

export { router as CompanyRoute };
