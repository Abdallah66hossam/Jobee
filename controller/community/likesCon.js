import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import Student from "../../models/StudentModel.js";
import Posts from "../../models/PostsModel.js";

/**-----------------------------------------------
 * @desc    Make a like
 * @route   /api/like/:postID
 * @method  POST
 * @access  student
 ------------------------------------------------*/

export const makeLike = asyncHandler(async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  let student = await Student.findOne({ email: decoded._id });

  let postID = req.params.id;
  let post = await Posts.findById(postID);
  let isExist = false;

  post.likes.forEach((st) => {
    if (st === student._id.toString()) {
      isExist = true;
      return;
    }
  });

  if (!isExist) {
    post.likes.push(student._id.toString());
    await post.save();

    return res
      .status(200)
      .json({ status: true, message: "You have liked the post" });
  } else {
    post.likes = post.likes.filter((id) => id !== student._id.toString());
    await post.save();
    return res
      .status(200)
      .json({ status: true, message: "You have unliked the post" });
  }
});
