const express = require("express");
const { body } = require("express-validator");
const User = require("../models/user");
const { signup, signIn } = require("../controllers/auth");

const Router = express.Router();

Router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email!")
      .custom((value, meta) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("This email already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 3 }),
    body("name").trim().not().isEmpty(),
  ],
  signup
);

Router.post("/signin", signIn)

module.exports = Router;
