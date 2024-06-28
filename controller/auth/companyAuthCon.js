import asyncHandler from "express-async-handler";
import Student from "../../models/StudentModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../services/auth/generateToken.js";
import cloudinary from "cloudinary";
import Company from "../../models/CompanyModel.js";

/**-----------------------------------------------
 * @desc    register Company
 * @route   /api/auth/register
 * @method  POST
 * @access  public
------------------------------------------------*/
export const registerCompany = asyncHandler(async (req, res) => {
  let profileImage = req.body.profileImage
    ? JSON.parse(req.body?.profileImage)
    : "";
  let resultProfile;
  let defaultImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png";
  if (profileImage) {
    resultProfile = await cloudinary.v2.uploader.upload(profileImage.path);
  }
  let companyExist = await Company.findOne({ email: req.body.email });
  let studentExist = await Student.findOne({ email: req.body.email });
  if (companyExist || studentExist) {
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
  const company = new Company({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
    confirmPassword: hashPassword2,
    profileImage: resultProfile?.secure_url || defaultImage,
    location: req.body.location,
    name: req.body.name,
    about: req.body.about,
    token,
  });
  await company.save();
  // Save the student document to the database
  res.status(201).json({
    status: true,
    message: "Company has been registered successfully",
    company,
    token,
  });
});
