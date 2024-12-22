const Candidate = require("../models/candidateSchema");

const sendError = (res, statusCode, message) => {
  res.status(statusCode).json({ message });
};

exports.candidateRegister = async (req, res) => {
  const candidate = await Candidate.create(req.body);
  res.status(200).json({
    status: "success",
    message: "candidate registered successfully",
    candidate,
  });
};

exports.getAllCandidates = async (req, res) => {
  const candidate = await Candidate.find();
  if (!candidate) sendError(res, 404, "No candidate found");
  res.status(200).json({
    status: "success",
    count: candidate.length,
    candidate,
  });
};

exports.getcandidate = async (req, res) => {
  const candidateId = req.params.candidateId;
  const candidate = await Candidate.findById(candidateId);
  if (!candidate) sendError(res, 404, "No candidate found");
  res.status(200).json({
    status: "success",
    candidate,
  });
};

exports.deleteCandidate = async (req, res) => {
  const candidate = await Candidate.findByIdAndDelete(req.params.candidateId);
  if (!candidate) return sendError(res, 404, "No candidate Found");
  res.status(200).json({
    status: "success",
    message: "candidate deleted successfully",
  });
};
