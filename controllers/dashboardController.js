const express = require("express");
const router = express.Router();

const User = require("../models/userModel");
const { restrictTo, isAllowed } = require("./userController");
const Candidate = require("../models/candidateSchema");

const getData = async (req, res) => {
  const users = await User.find();
  const usersVoted = users.filter((user) => user.isVoted == true).length;

  const results = await Candidate.aggregate([
    {
      $unwind: "$votes" // Flatten the votes array
    },
    {
      $group: {
        _id: "$party", // Group by party
        totalVotes: { $sum: 1 } // Count the number of votes per party
      }
    },
    {
      $sort: { totalVotes: -1 } // Sort in descending order
    }
  ]);
  

  res.status(200).json({
    "Users Voted": usersVoted,
    results,
  });
};

router.get("/", isAllowed, restrictTo("admin"), getData);

module.exports = router;
