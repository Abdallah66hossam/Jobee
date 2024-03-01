import multer from "multer";
import path from "path";

const storage = multer.diskStorage({});

export const upload = multer({ storage: storage });
