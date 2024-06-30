import { model, Schema } from "mongoose";

export const mentorSchema = new Schema({
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
    type: String,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
  },
  age: {
    type: Number,
    required: true,
  },
  track: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  facebook: String,
  courses: {
    type: [String],
  },
});

const Mentor = model("Mentor", mentorSchema);

export default Mentor;
