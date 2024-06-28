import { model, Schema } from "mongoose";

export const companySchema = new Schema({
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
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const Company = model("Company", companySchema);

export default Company;
