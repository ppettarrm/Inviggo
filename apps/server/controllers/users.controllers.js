const express = require("express");
const { check } = require("express-validator");

const userServices = require("../services/users.service");

const router = express.Router();

router.post(
  "/login",
  [
    check("username").notEmpty(), 
    check("password").notEmpty()],
    userServices.login
);

router.post(
  "/signup",
  [
    check("username").notEmpty(),
    check("password").isLength({min: 6}),
    check("tel").notEmpty()
  ],
  userServices.signup
);

module.exports = router;
