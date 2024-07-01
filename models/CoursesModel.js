import { Schema, model } from "mongoose";

const videoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

const CoursesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    track: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    videos: {
      type: [videoSchema],
      required: true,
    },
    will_learn: {
      type: String,
      required: true,
    },
    cover_img: {
      type: Object,
      required: true,
    },
    mentorId: String,
  },
  { timestamps: true }
);

const Course = model("course", CoursesSchema);
export default Course;
