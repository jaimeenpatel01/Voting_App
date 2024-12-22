const express = require("express");
const {
  signup,
  login,
  profile,
  isAllowed,
  updateProfile,
  getAllUsers,
  restrictTo,
} = require("../controllers/userController");
const router = express.Router();


router.get("/",isAllowed,restrictTo('admin'), getAllUsers);
router.post("/signup", signup);
router.post("/login", login);

router
  .route("/profile")
  .get(isAllowed, profile)
  .patch(isAllowed, updateProfile);

module.exports = router;
