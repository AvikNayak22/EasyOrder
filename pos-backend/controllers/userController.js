const createHttpError = require("http-errors");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const register = async (req, res, next) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !phone || !password || !role) {
      const err = createHttpError(400, "Please provide all required fields!");
      return next(err);
    }

    const isUserPresent = await User.findOne({ email });

    if (isUserPresent) {
      const err = createHttpError(400, "User already exists!");
      return next(err);
    }

    const user = { name, email, phone, password, role };
    const newUser = User(user);
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "New user created!",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const err = createHttpError(400, "Please provide all required fields!");
      return next(err);
    }

    const isUserPresent = await User.findOne({ email });
    if (!isUserPresent) {
      const err = createHttpError(401, "User with this email does not exist!");
      return next(err);
    }

    const isMatch = bcrypt.compare(password, isUserPresent.password);
    if (!isMatch) {
      const err = createHttpError(401, "Invalid password!");
      return next(err);
    }

    const accessToken = jwt.sign(
      {
        _id: isUserPresent._id,
      },
      config.accessTokenSecret,
      { expiresIn: "1d" }
    );

    res.cookie("accessToken", accessToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.status(200).json({
      sucess: true,
      message: "User logged in successfully!",
      data: isUserPresent,
    });
  } catch (error) {
    next(error);
  }
};

const getUserData = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      message: "User data fetched successfully!",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getUserData };
