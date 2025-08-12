const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const upload  = require("../middleware/uploadMiddleware");

const {
  registerUser,
  loginUser,
  getUserProfile,
  uploadImage
} = require("../controllers/authControllers");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserProfile);
router.post("/upload-image", upload.single("image"), uploadImage);
module.exports = router;
