import asyncHandler from "express-async-handler";
import Student from "../../models/StudentModel.js";
import { validationResult } from "express-validator";

export const registerStudent = asyncHandler((req, res) => {
  // Get the validation result
  const errors = validationResult(req);
  // If there are errors, send a 400 response with the error messages
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else if (Student.findOne({ email: req.body.email })) {
    return res
      .status(500)
      .json({ errors: [{ msg: `${req.body.email} is already used` }] });
  }

  // If there are no errors, create a new student document with the request body
  const student = new Student(req.body);
  student.save();
  // Save the student document to the database
  res.status(201).json({ student });
  // student.save((err, student) => {
  //   // If there is an error, send a 500 response with the error message
  //   if (err) {
  //     return res.status(500).json({ status: false, error: err.message });
  //   }
  //   // If there is no error, send a 201 response with the student data
  // });
});
