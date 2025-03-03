const config = require("../config/config");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const createHttpError = require("http-errors");

const isVerifiedUser = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      const err = createHttpError(401, "Please login first!");
      return next(err);
    }

    const decodeToken = jwt.verify(accessToken, config.accessTokenSecret);

    const user = await User.findById(decodeToken._id);
    if (!user) {
      const err = createHttpError(401, "User does not exist!");
      return next(err);
    }

    req.user = user;

    next();
  } catch (error) {
    const err = createHttpError(401, "Invalid token!");
    next(err);
  }
};

module.exports = isVerifiedUser;
