import asyncHandler from "express-async-handler";
import Student from "../../models/StudentModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../services/auth/generateToken.js";
import cloudinary from "cloudinary";

/**-----------------------------------------------
 * @desc    register User
 * @route   /api/auth/register
 * @method  POST
 * @access  public
------------------------------------------------*/
export const registerStudent = asyncHandler(async (req, res) => {
  let profileImage = req.body.profileImage
    ? JSON.parse(req.body?.profileImage)
    : "";
  let resultProfile;
  let defaultImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png";
  if (profileImage) {
    resultProfile = await cloudinary.v2.uploader.upload(profileImage.path);
  }
  let userExist = await Student.findOne({ email: req.body.email });
  if (userExist) {
    return res.status(400).json({
      status: false,
      errors: [{ msg: `${req.body.email} is already used` }],
    });
  }
  let resultCV;
  if (!req.body?.cv) {
    console.log("no cv");
  } else {
    let cv = JSON.parse(req.body.cv);
    resultCV = await cloudinary.v2.uploader.upload(cv.path, {
      resource_type: "raw",
      type: "upload",
      access_mode: "public",
    });
  }

  // hash the password
  let salt = await bcrypt.genSalt(10);
  let hashPassword = await bcrypt.hash(req.body.password, salt);
  let hashPassword2 = await bcrypt.hash(req.body.confirmPassword, salt);
  let token = generateToken(req.body._id, req.body.email);
  // If there are no errors, create a new student document with the request body
  const student = new Student({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
    confirmPassword: hashPassword2,
    profileImage: resultProfile?.secure_url || defaultImage,
    age: req.body.age,
    experience: req.body.experience,
    track: req.body.track,
    tracklevel: req.body.tracklevel,
    militaryStatus: req.body.militaryStatus,
    about: req.body.about,
    skills: req.body.skills,
    cv: resultCV ? resultCV.secure_url : "",
    token,
  });
  await student.save();
  // Save the student document to the database
  res.status(201).json({
    status: true,
    message: "Student has been registered successfully",
    studentId: student._id,
    token,
  });
});

/**-----------------------------------------------
 * @desc    Login User
 * @route   /api/auth/login
 * @method  POST
 * @access  public
 ------------------------------------------------*/
export const loginStudent = asyncHandler(async (req, res) => {
  const student = await Student.findOne({ email: req.body.email });
  if (!student) {
    return res.status(400).json({ message: "invalid email or password" });
  }

  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    student.password
  );
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "invalid email or password" });
  }
  let token = generateToken(req.body.email);
  res.status(200).json({
    status: true,
    message: "Logged in successfully",
    data: student,
    token,
    rule: "student",
  });
});
