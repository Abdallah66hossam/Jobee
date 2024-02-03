import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/connectDB.js";
import cors from "cors";
import { StudentRoute } from "./routes/auth/student.js";

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

app.use("/api/auth", StudentRoute);

// listen to server
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
