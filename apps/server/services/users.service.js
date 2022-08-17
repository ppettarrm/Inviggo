const HttpError = require("../utils/http-error");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const signup = async (req, res, next) => {
  let date_ob = new Date();
  const date =
    date_ob.getDate() + "." + date_ob.getMonth() + "." + date_ob.getFullYear();

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data!", 422)
    );
  }

  const { username, password, tel } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ username: username });
  } catch (err) {
    return next(
      new HttpError("Signing up failed, please try again later!"),
      404
    );
  }

  if (existingUser) {
    return next(
      new HttpError("User exists already, please login instead.", 422)
    );
  }

  let hashPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    return next(new HttpError("Could not create user, please try again.", 500));
  }

  const newUser = new User({
    username,
    password: hashedPassword,
    date,
    tel,
    products: [],
  });

  try {
    newUser.save();
  } catch (err) {
    return next(
      new HttpError("Signing up failed, please try again later.", 500)
    );
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: newUser.id,
        username: newUser.username,
        date: newUser.date,
        tel: newUser.tel,
      },
      "inviggo-secret",
      { expiresIn: "1h" }
    );
  } catch (error) {
    return next(
      new HttpError("Signing up failed, please try again later.", 500)
    );
  }

  res
    .status(201)
    .json({
      userId: newUser.id,
      username: newUser.username,
      date: newUser.date,
      tel: newUser.tel,
      token: token,
    });
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data!", 422)
    );
  }
  const { username, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ username: username });
  } catch (err) {
    return next(
      new HttpError("Logging in failed, please try again later!"),
      500
    );
  }

  if (!existingUser) {
    return next(
      new HttpError("User does not exist, please sign in instead.", 422)
    );
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return next(
      new HttpError("Logging in failed, please try again later!"),
      500
    );
  }

  if (!isValidPassword) {
    return next(new HttpError("Invalid credentials, could not log in.", 401));
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        username: existingUser.username,
        date: existingUser.date,
        tel: existingUser.tel,
      },
      "inviggo-secret",
      { expiresIn: "1h" }
    );
  } catch (error) {
    return next(
      new HttpError("Logging in failed, please try again later.", 500)
    );
  }

  res
    .status(200)
    .json({
      userId: existingUser.id,
      username: existingUser.username,
      date: existingUser.date,
      tel: existingUser.tel,
      token: token,
    });
};

exports.login = login;
exports.signup = signup;
