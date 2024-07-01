import { model, Schema } from "mongoose";

export const studentSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5,
    maxlength: 100,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  profileImage: {
    type: Object,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
  },
  age: {
    type: Number,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  track: {
    type: String,
    required: true,
  },
  tracklevel: {
    type: String,
    required: true,
  },
  militaryStatus: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  cv: {
    type: Object,
  },
  score: Number,
});

const Student = model("Student", studentSchema);

export default Student;
