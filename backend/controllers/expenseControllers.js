const Expense = require("../models/Expense");
const xlsx = require("xlsx");

exports.addExpense = async (req, res) => {
  const userId = req.user.id;
  const { icon, category, amount, date } = req.body || {};
  if (!category || !amount || !date) {
    return res.status(400).json({
      message: "Please provide all required fields: category, amount, date",
    });
  }
  try {
    const newExpense = await Expense.create({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });
    res.status(200).json({
      message: "Expense added successfully",
      expense: newExpense,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while adding expense, please try again later",
      error: error.message,
    });
  }
};

exports.getExpense = async (req, res) => {
  // console.log("Fetching expenses for user:", req.user);
  const userId = req.user.id;
  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    if (!expense) {
      return res
        .status(404)
        .json({ message: "No expenses found for this user." });
    }
    res.status(200).json({
      message: "Expense fetched successfully",
      expense,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while fetching expenses, please try again later",
      error: error.message,
    });
  }
};

exports.downloadExpenseReport = async (req, res) => {
  const userId = req.user.id;
  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    if (!expense || expense.length === 0) {
      return res
        .status(404)
        .json({ message: "No expense found for this user." });
    }
    const data = expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date.toISOString().split("T")[0],
    }));
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense Report");
    xlsx.writeFile(wb, "Expense_Report.xlsx");
    res.download("Expense_Report.xlsx");
    return res.status(200).json({
      message: "Expense report downloaded successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "Server error while downloading expense report, please try again later",
      error: error.message,
    });
  }
};

exports.deleteExpense = async (req, res) => {
  const userId = req.user.id;
  const expenseId = req.params.id;
  try {
    const expense = await Expense.findOneAndDelete({
      _id: expenseId,
      userId: userId,
    });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({
      message: "Expense deleted successfully",
      expense,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while deleting expense, please try again later",
      error: error.message,
    });
  }
};
