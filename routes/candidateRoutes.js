const express = require("express");
const router = express.Router();
const { isAllowed, restrictTo } = require("../controllers/userController");
const {
  deleteCandidate,
  candidateRegister,
  getAllCandidates,
} = require("../controllers/candidateController");

router.use(isAllowed);
router.post("/register", restrictTo("admin"), candidateRegister);
router.get("/", restrictTo("admin"), getAllCandidates);
router.route("/:candidateId").delete(restrictTo("admin"), deleteCandidate);

module.exports = router;
