const User = require("../models/User");
const Income = require("../models/Income");
const xlsx = require("xlsx");

exports.addIncome = async (req, res) => {
  const userId = req.user.id;
  const { icon, source, amount, date } = req.body || {};
  if (!source || !amount || !date) {
    return res.status(400).json({
      message: "Please provide all required fields: source, amount, date",
    });
  }
  try {
    const newIncome = await Income.create({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });
    res.status(201).json({
      message: "Income added successfully",
      income: newIncome,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while adding income, please try again later",
      error: error.message,
    });
  }
};

exports.getIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    if (!income) {
      return res.status(404).json({ message: "No income found for this user" });
    }
    res.status(200).json({
      message: "Income fetched successfully",
      income,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while fetching income, please try again later",
      error: error.message,
    });
  }
};

exports.deleteIncome = async (req, res) => {
  try {
    const income = await Income.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }
    // console.log(income);
    res.status(200).json({
      message: "Income deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while deleting income, please try again later",
      error: error.message,
    });
  }
};

exports.downloadIncomeReport = async (req, res) => {
  const userId = req.user.id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    if (!income || income.length === 0) {
      return res
        .status(404)
        .json({ message: "No income data found for this user" });
    }
    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date.toISOString().split("T")[0],
    }));
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income Report");
    xlsx.writeFile(wb, "Income_Report.xlsx");
    res.download("Income_Report.xlsx");
    return res.status(200).json({
      message: "Income report downloaded successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "Server error while fetching income for report, please try again later",
      error: error.message,
    });
  }
};
