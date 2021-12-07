const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Token = require("../models/Token");
const {
  registerValidator,
  loginValidator
} = require("../validators/authValidator");

exports.createUser = async (req, res) => {
  const { error } = registerValidator(req.body);
  if (error) {
    return res.status(400).json({
      status: "fail",
      message: error.details[0].message
    });
  }

  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
      role: req.body.role,
      department: req.body.department
    });

    res.status(200).json({
      status: "success",
      message: "new user created",
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        department: user.department
      }
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.login = async (req, res) => {
  const { error } = loginValidator(req.body);
  if (error) {
    return res.status(400).json({
      status: "fail",
      message: error.details[0].message
    });
  }

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "User not exists"
      });
    }

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid password"
      });
    }

    const accessToken = jwt.sign(
      { _id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );
    const refreshToken = jwt.sign(
      { _id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1y" }
    );

    const token = await Token.create({
      user: user._id,
      token: refreshToken
    });

    res.status(200).json({
      status: "success",
      message: "user logged in",
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        department: user.department
      }
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.logout = async (req, res) => {
  try {
    const token = await Token.findOne({ token: req.body.refreshToken });
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid token"
      });
    }
    await Token.findOneAndRemove({
      token: req.body.refreshToken
    });
    res.status(200).json({
      status: "success",
      message: "user logged out"
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.token = async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({
        status: "fail",
        message: "Access denied"
      });
    }
    const token = await Token.findOne({ token: refreshToken });
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "Access denied"
      });
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({
          status: "fail",
          message: "Access denied"
        });
      }
      const accessToken = jwt.sign(
        { _id: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10m" }
      );
      res.status(200).json({
        status: "success",
        message: "New token generated",
        accessToken: accessToken
      });
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
