import { check } from "express-validator";

// student validation
export const studentValidation = [
  check("username")
    .isAlphanumeric()
    .withMessage("Username must contain letters and numbers only")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email address!")
    .trim(),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long!")
    .custom((value, { req }) => {
      if (value !== req.body.confirmPassword) {
        throw new Error("Password and confirm password do not match");
      }
      return true;
    }),
  check("profileImage")
    .optional()
    .isURL()
    .withMessage("Profile image should be a valid URL"),
  check("age")
    .isInt({ min: 18, max: 100 })
    .withMessage("Age should be an integer between 18 and 100"),
  check("experience")
    .isInt({ min: 0 })
    .withMessage("Experience should be a non-negative integer"),
  check("track")
    .isIn([
      "Frontend",
      "Backend",
      "Flutter",
      "Data Science",
      "Android",
      "IOS",
      "UX UI",
    ])
    .withMessage("Track should be one of web, mobile, or UX/UI ect.."),
  check("tracklevel")
    .isIn(["Beginner", "Intermediate", "Advanced"])
    .withMessage(
      "Track level should be one of beginner, intermediate, or advanced"
    ),
  check("militaryStatus")
    .isIn(["exempted", "completed", "postponed", "serving"])
    .withMessage(
      "Military status should be one of exempted, completed, postponed, or serving"
    ),
  check("about")
    .isString()
    .withMessage("About should be a string")
    .trim()
    .isLength({ max: 500 })
    .withMessage("About should be no more than 500 characters long"),
  check("skills")
    .isArray()
    .withMessage("Skills is Required")
    .custom((value) => {
      for (let skill of value) {
        if (typeof skill !== "string") {
          throw new Error("Each skill should be a string");
        }
      }
      return true;
    }),
];
