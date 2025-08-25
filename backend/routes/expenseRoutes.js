const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
    addExpense,
    getExpense,
    deleteExpense,
    downloadExpenseReport
} = require("../controllers/expenseControllers");

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/get", protect, getExpense);
router.get("/download-report", protect, downloadExpenseReport);
router.delete("/:id", protect, deleteExpense);
module.exports = router;