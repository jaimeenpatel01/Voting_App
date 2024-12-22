const Candidate = require("../models/candidateSchema");
const User = require("../models/userModel");
const sendConfirmationEmail = require("../utils/nodemailer");

const sendError = (res, statusCode, message) => {
  res.status(statusCode).json({ message });
};

exports.voteForCandidate = async (req, res) => {
  const candidateId = req.params.candidateId;
  const user = await User.findById(req.user.id);
  const candidate = await Candidate.findById(candidateId);

  if (user.isVoted)
    return sendError(res, 400, "User vote has already been registered");

  if (user.role === "admin")
    return sendError(res, 400, "Admin cannot cast a vote");

  if (!candidate) return sendError(res, 404, "Candidate Not Found");
  candidate.votes.push({ user: user.id });
  candidate.voteCount++;
  user.isVoted = true;

  await candidate.save();
    await user.save();
    
  await sendConfirmationEmail(user.email, user.name);
  res.status(200).json({
    status: "success",
    message: "User vote has been registered successfully !!!",
  });
};
