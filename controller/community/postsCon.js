import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import Student from "../../models/StudentModel.js";
import Posts from "../../models/PostsModel.js";
import cloudinary from "cloudinary";

/**-----------------------------------------------
 * @desc    Get all posts
 * @route   /api/jobs/all
 * @method  GET
 * @access  admin, mentor and student
 ------------------------------------------------*/
export const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Posts.find({})
    .populate("studentId", "username profileImage")
    .populate("comments.studentId", "username profileImage");
  res.status(200).json({ status: true, data: posts.reverse() });
});

/**-----------------------------------------------
 * @desc   Create a post
 * @route   /api/jobs/create
 * @method  POST
 * @access  admin, mentor and student
 ------------------------------------------------*/
export const createPost = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  let student = await Student.findOne({ email: decoded._id || decoded.email });

  let img = req.body?.img;
  let img_url;

  if (img) {
    let parse = JSON.parse(img);
    img_url = await cloudinary.v2.uploader.upload(parse.path).secure_url;
  }
  const post = await Posts.create({
    content: req.body.content,
    img: img_url,
    studentId: student._id.toString(),
  });
  if (post) {
    res.status(201).json({
      status: true,
      message: "The Post has been created successfully!",
      data: post,
      student,
    });
  } else {
    res.status(400).json({
      status: false,
      message: "An error has been occured while creating the post!",
    });
  }
});

/**-----------------------------------------------
 * @desc   Get a post
 * @route   /api/jobs/:id
 * @method  GET
 * @access  admin, mentor and student
 ------------------------------------------------*/
export const getPost = asyncHandler(async (req, res) => {
  let id = req.params.id;

  const post = await Posts.findById(id)
    .populate("studentId", "username profileImage")
    .populate("comments.studentId", "username profileImage");

  if (post) {
    res.status(200).json({ status: true, data: post });
  } else {
    res.status(400).json({
      status: false,
      message: "An error has been occured while getting the post!",
    });
  }
});

/**-----------------------------------------------
 * @desc    Update a post
 * @route   /api/jobs/update/:id
 * @method  PUT
 * @access  admin and student
 ------------------------------------------------*/
export const updatePost = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let updateData = req.body;

  const post = await Posts.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (post) {
    res.status(200).json({
      status: true,
      message: "The post has been updated succesfully!",
      data: post,
    });
  } else {
    res.status(400).json({
      status: false,
      message: "An error has been occured while updating the post!",
    });
  }
});

/**-----------------------------------------------
 * @desc    Delete a post
 * @route   /api/jobs/:id
 * @method  Delete
 * @access  admin and student
 ------------------------------------------------*/
export const deletePost = asyncHandler(async (req, res) => {
  let id = req.params.id;

  const post = await Posts.findByIdAndDelete(id);
  if (post) {
    res
      .status(200)
      .json({ status: true, data: "The Post has been deleted succesfully!" });
  } else {
    res.status(400).json({
      status: false,
      message: "An error has been occured while deleting the post!",
    });
  }
});
