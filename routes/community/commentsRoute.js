import express from "express";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { makeComment } from "../../controller/community/commentCon.js";
const router = express.Router();

router.post("/:id", verifyToken, makeComment);

export { router as commentsRoute };
