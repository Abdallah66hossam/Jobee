import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import Student from "../../models/StudentModel.js";
import Posts from "../../models/PostsModel.js";
import Comments from "../../models/CommentsModel.js";

/**-----------------------------------------------
 * @desc    Make a comment
 * @route   /api/comments/:postID
 * @method  POST
 * @access  student
 ------------------------------------------------*/

export const makeComment = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  let student = await Student.findOne({ email: decoded._id });
  if (!student) {
    return res
      .status(404)
      .json({ status: false, message: "Student not found" });
  }

  let post = await Posts.findById(postId);
  if (!post) {
    return res.status(404).json({ status: false, message: "Post not found" });
  }

  post.comments.push({
    studentId: student._id,
    content: req.body.content,
  });

  await post.save();

  return res
    .status(200)
    .json({ status: true, data: { comment: req.body.content, student } });
});
