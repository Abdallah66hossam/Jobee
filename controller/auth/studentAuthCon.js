import asyncHandler from "express-async-handler";
import Student from "../../models/StudentModel.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

export const registerStudent = asyncHandler(async (req, res) => {
  // Get the validation result
  const errors = validationResult(req);
  // If there are errors, send a 400 response with the error messages
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: false, errors: errors.array() });
  }
  let userExist = await Student.findOne({ email: req.body.email });
  if (userExist) {
    return res.status(500).json({
      status: false,
      errors: [{ msg: `${req.body.email} is already used` }],
    });
  }

  // hash the password
  let salt = await bcrypt.genSalt(10);
  let hashPassword = await bcrypt.hash(req.body.password, salt);
  let hashPassword2 = await bcrypt.hash(req.body.confirmPassword, salt);
  // If there are no errors, create a new student document with the request body
  const student = new Student({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
    confirmPassword: hashPassword2,
    profileImage: req.body.profileImage,
    age: req.body.age,
    experience: req.body.experience,
    track: req.body.track,
    tracklevel: req.body.tracklevel,
    militaryStatus: req.body.militaryStatus,
    about: req.body.about,
    skills: req.body.skills,
  });
  await student.save();
  // Save the student document to the database
  res.status(201).json({
    status: true,
    user: {
      username: req.body.username,
      email: req.body.email,
      profileImage: req.body.profileImage,
      age: req.body.age,
      experience: req.body.experience,
      track: req.body.track,
      tracklevel: req.body.tracklevel,
      militaryStatus: req.body.militaryStatus,
      about: req.body.about,
      skills: req.body.skills,
    },
  });
});
