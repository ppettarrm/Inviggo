const HttpError = require("./http-error");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return next(new HttpError("Authentication failed", 401));
    }

    const decodedToken = jwt.verify(token, "inviggo-secret");
    req.userData = { 
      userId: decodedToken.userId,
      username: decodedToken.username,
      date: decodedToken.date,
      tel: decodedToken.tel,
    };
    next();
  } catch (error) {
    return next(new HttpError("Authentication failed x2", 401));
  }
};
