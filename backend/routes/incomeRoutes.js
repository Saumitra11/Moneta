const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
    addIncome,
    getIncome,
    deleteIncome,
    downloadIncomeReport
} = require("../controllers/incomeControllers");

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/get", protect, getIncome);
router.get("/download-report", protect, downloadIncomeReport);
router.delete("/:id", protect, deleteIncome);
module.exports = router;