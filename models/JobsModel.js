import { Schema, model } from "mongoose";

const JobsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    requirements: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    exp: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    track: {
      type: String,
      required: true,
    },
    companyId: {
      type: String,
      ref: "Company",
      required: true,
    },
    applied: [
      {
        studentId: {
          ref: "Student",
          type: Schema.Types.ObjectId,
        },
      },
    ],
  },
  { timestamps: true }
);

const Jobs = model("jobs", JobsSchema);
export default Jobs;
