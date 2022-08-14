const express = require("express");
const { check } = require("express-validator");

const userControllers = require("../controllers/users-controllers");

const router = express.Router();

router.post(
  "/login",
  [
    check("username").notEmpty(), 
    check("password").notEmpty()],
  userControllers.login
);

router.post(
  "/signup",
  [
    check("username").notEmpty(),
    check("password").isLength({min: 6}),
    check("tel").notEmpty()
  ],
  userControllers.signup
);

module.exports = router;
