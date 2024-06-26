import express from "express";
import { upload } from "../../config/multer.js";
import { registerMentor } from "../../controller/auth/mentorAuthCon.js";

const router = express.Router();

const uploadFiles = upload.fields([{ name: "profileImage", maxCount: 1 }]);

router.post("/register", uploadFiles, registerMentor);

export { router as MentorRoute };
