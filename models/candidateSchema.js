const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: { type: String, require: true },
  age: { type: Number, require: true },
  party: { type: String, required: true, unique: true },
  votes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      votedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  voteCount: {
    type: Number,
    default: 0,
  },
});

const Candidate = mongoose.model("Candidate", candidateSchema);
module.exports = Candidate;