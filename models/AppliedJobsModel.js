import { Schema, model } from "mongoose";

const AppliedJobsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    track: {
      type: String,
      required: true,
    },
    cv: {
      type: String,
      required: true,
    },
    jobId: {
      type: String,
      required: true,
    },
    studentId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AppliedJobs = model("AppliedJobs", AppliedJobsSchema);
export default AppliedJobs;
