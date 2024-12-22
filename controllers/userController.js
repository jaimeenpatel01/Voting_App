const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const sendError = (res, statusCode, message) => {
  res.status(statusCode).json({ message });
};

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "3d" });
};

exports.isAllowed = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(decoded.id).select("-password");
  if (!user) return sendError(res, 404, "Token invalid");
  req.user = user;
  next();
};
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(404).json({
        status: "failed",
        message: "You do not have permission to access the route",
      });
    }
    next();
  };
};

exports.signup = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    password: hashedPassword,
    aadharNumber: req.body.aadharNumber,
    role: req.body.role,
  });

  await user.save();
  res.status(200).json({
    status: "success",
    message: "User created successfully",
  });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return sendError(res, 400, "Email or password not found");

    const user = await User.findOne({ email });
    if (!user) return sendError(res, 400, "User not found");

    const decodedPassword = await bcrypt.compare(password, user.password);
    if (!decodedPassword) return sendError(res, 401, "Incorrect Password");
    const token = signToken(user.id);
    res.status(200).json({
      status: "success",
      message: "User logged in successfully !!!",
      token,
    });
  } catch (error) {
    return sendError(res, 500, error);
  }
};

exports.profile = async (req, res) => {
  return res.status(200).json({
    status: "success",
    data: req.user,
  });
};

exports.updateProfile = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword)
    return sendError(res, 400, "Enter current and new password");
  const user = await User.findById(req.user.id);
  const decodedPassword = await bcrypt.compare(currentPassword, user.password);
  if (!decodedPassword) return sendError(res, 401, "Incorrect Password");

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  await user.save();

  res.status(200).json({
    status: "success",
    message: "Profile updated successfully!!",
  });
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    users,
  });
};
