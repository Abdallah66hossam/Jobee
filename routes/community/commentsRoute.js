import express from "express";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { makeLike } from "../../controller/community/commentCon.js";
const router = express.Router();

router.post("/:id", verifyToken, makeLike);

export { router as commentsRoute };
