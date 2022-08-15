const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

const User = require("../models/user");

const signup = async (req, res, next) => {
  let date_ob = new Date();
  const date =
    date_ob.getDate() + "." + date_ob.getMonth() + "." + date_ob.getFullYear();

    const { usernames, passwords, tels } = req.body;
    console.log(usernames);
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

  const newUser = new User({
    username,
    password,
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
  res.status(201).json({ user: newUser.toObject({ getters: true }) });
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

  if (existingUser.password !== password) {
    return next(new HttpError("Invalid credentials, could not log in.", 401));
  }

  res.status(200).json({ message: "Logged in!" });
};

exports.login = login;
exports.signup = signup;
