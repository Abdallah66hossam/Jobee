import express from "express";
import { getMilitry } from "../../controller/militry/MilitryCon.js";
const router = express.Router();

router.get("/", getMilitry);

export { router as getMilitryRoute };
