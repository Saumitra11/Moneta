const express = require("express");
// const { protect } = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/authControllers");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
// router.get("/getUser", protect, getUserProfile);

module.exports = router;
