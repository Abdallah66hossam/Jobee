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
const router = express.Router();

router.get("/all", verifyToken, getAllPosts);
router.get("/:id", verifyToken, getPost);
router.post("/create", verifyToken, createPost);
router.put("/update/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);

export { router as postsRoute };
