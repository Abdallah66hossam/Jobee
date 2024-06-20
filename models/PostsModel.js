import { Schema, model } from "mongoose";

const PostsSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);

const Posts = model("posts", PostsSchema);
export default Posts;
