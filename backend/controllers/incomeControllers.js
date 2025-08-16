const User = require("../models/User");
const Income = require("../models/Income");

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
    res.status(200).json({
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

exports.getIncome = async (req, res) => {};

exports.deleteIncome = async (req, res) => {};

exports.downloadIncomeReport = async (req, res) => {};
