const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getDashBoardData } = require("../controllers/dashboardControllers");

const router = express.Router();

router.get("/", protect, getDashBoardData);

module.exports = router;