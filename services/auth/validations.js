import { body, check } from "express-validator";

// student register validation
export const studentRegisterValidation = [
  body("username")
    .isAlphanumeric()
    .withMessage("Username must contain letters and numbers only")
    .trim(),
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address!")
    .trim(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long!")
    .custom((value, { req }) => {
      if (value !== req.body.confirmPassword) {
        throw new Error("Password and confirm password do not match");
      }
      return true;
    }),
  body("age")
    .isInt({ min: 18, max: 100 })
    .withMessage("Age should be an integer between 18 and 100"),
  body("experience")
    .isInt({ min: 0 })
    .withMessage("Experience should be a non-negative integer"),
  body("track")
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
  body("tracklevel")
    .isIn(["Beginner", "Intermediate", "Advanced"])
    .withMessage(
      "Track level should be one of beginner, intermediate, or advanced"
    ),
  body("militaryStatus")
    .isIn(["exempted", "completed", "postponed", "serving"])
    .withMessage(
      "Military status should be one of exempted, completed, postponed, or serving"
    ),
  body("about")
    .isString()
    .withMessage("About should be a string")
    .trim()
    .isLength({ max: 500 })
    .withMessage("About should be no more than 500 characters long"),
  body("skills")
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

// student login validation
export const studentLoginValidation = [
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email address!")
    .trim(),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long!"),
];
