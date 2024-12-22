const express = require("express");
const { voteForCandidate } = require("../controllers/voteController");
const { isAllowed, restrictTo } = require("../controllers/userController");
const router = express.Router();

router.post("/:candidateId", isAllowed, restrictTo("voter"), voteForCandidate);

module.exports = router;
