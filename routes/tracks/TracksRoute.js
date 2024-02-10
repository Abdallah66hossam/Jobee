import express from "express";
import { getTracks } from "../../controller/track/trackCon.js";
const router = express.Router();

router.get("/", getTracks);

export { router as getTracksRoute };
