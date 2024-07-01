import express from "express";
import {
  validate,
  postsValidationRules,
} from "../../services/auth/validations.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from "../../controller/community/postsCon.js";
import { upload } from "../../config/multer.js";
const router = express.Router();

const uploadFiles = upload.fields([{ name: "img", maxCount: 1 }]);

router.get("/all", verifyToken, getAllPosts);
router.get("/:id", verifyToken, getPost);
router.post("/create", verifyToken, uploadFiles, createPost);
router.put("/update/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);

export { router as postsRoute };
