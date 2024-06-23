import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import Student from "../../models/StudentModel.js";
import Posts from "../../models/PostsModel.js";

/**-----------------------------------------------
 * @desc    Make a comment
 * @route   /api/like/:postID
 * @method  POST
 * @access  student
 ------------------------------------------------*/

export const makeLike = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  let student = await Student.findOne({ email: decoded._id });

  let { content } = req.body;

  let postID = req.params.id;
  let post = await Posts.findById(postID);

  post.comments.push({ content, student });
  await post.save();

  return res.status(200).json({ status: true, data: { content, student } });
});
