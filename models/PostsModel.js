import { Schema, model } from "mongoose";
import { studentSchema } from "./StudentModel.js";

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    student: [studentSchema],
  },
  { timestamps: true }
);

const PostsSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
    likes: {
      type: [String],
    },
    comments: [CommentSchema],
  },
  { timestamps: true }
);

const Posts = model("posts", PostsSchema);
export default Posts;
