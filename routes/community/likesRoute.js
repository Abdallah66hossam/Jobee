import express from "express";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { makeLike } from "../../controller/community/likesCon.js";
const router = express.Router();

router.post("/:id", verifyToken, makeLike);

export { router as likesRoute };
