import asyncHandler from "express-async-handler";
import Student from "../../models/StudentModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../services/auth/generateToken.js";
import cloudinary from "cloudinary";
import Company from "../../models/CompanyModel.js";
import Mentor from "../../models/MentorModel.js";

/**-----------------------------------------------
 * @desc    register Mentor
 * @route   /api/auth/register
 * @method  POST
 * @access  public
------------------------------------------------*/
export const registerMentor = asyncHandler(async (req, res) => {
  let profileImage = req.files.profileImage[0];
  let resultProfile;
  let defaultImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png";
  if (profileImage) {
    resultProfile = await cloudinary.v2.uploader.upload(profileImage.path);
  }
  let companyExist = await Company.findOne({ email: req.body.email });
  let studentExist = await Student.findOne({ email: req.body.email });
  let mentorExist = await Mentor.findOne({ email: req.body.email });
  if (companyExist || studentExist || mentorExist) {
    return res.status(400).json({
      status: false,
      errors: [{ msg: `${req.body.email} is already used` }],
    });
  }

  // hash the password
  let salt = await bcrypt.genSalt(10);
  let hashPassword = await bcrypt.hash(req.body.password, salt);
  let hashPassword2 = await bcrypt.hash(req.body.confirmPassword, salt);
  let token = generateToken(req.body._id, req.body.email);
  // If there are no errors, create a new student document with the request body
  const mentor = new Mentor({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
    confirmPassword: hashPassword2,
    profileImage: resultProfile?.secure_url || defaultImage,
    about: req.body.about,
    age: req.body.age,
    facebook: req.body.facebook,
    track: req.body.track,
    gender: req.body.gender,
    token,
  });
  await mentor.save();
  // Save the student document to the database
  res.status(201).json({
    status: true,
    message: "Mentor has been registered successfully",
    mentor,
    token,
  });
});
