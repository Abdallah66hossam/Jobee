import { Schema, model } from "mongoose";

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
    comments: [
      {
        studentId: {
          type: Schema.Types.ObjectId,
          ref: "Student",
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
      },
    ],
    studentId: {
      type: String,
      ref: "Student",
      required: true,
    },
  },
  { timestamps: true }
);

const Posts = model("posts", PostsSchema);
export default Posts;
