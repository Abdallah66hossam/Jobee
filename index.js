import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/connectDB.js";
import cors from "cors";
import { StudentRoute } from "./routes/auth/student.js";
import { getStudentRoute } from "./routes/student/getStudent.js";
import { getTracksRoute } from "./routes/tracks/TracksRoute.js";

// dotenv configuration
dotenv.config();
const PORT = process.env.PORT || 4000;

// connect to db
connectToDB();
// initialize express app
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/tracks", getTracksRoute);
app.use("/api/student/auth", StudentRoute);
app.use("/api/student", getStudentRoute);

// listen to server
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
