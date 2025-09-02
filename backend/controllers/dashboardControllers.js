const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

exports.getDashBoardData = async (req, res) => {
  const userId = req.user.id;
  const userObjectId = new Types.ObjectId(String(userId));

  try {
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    console.log("Total Income:", {
      totalIncome,
      userId: isValidObjectId(userId),
    });

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Income in last 60 days
    const last60DaysIncomeTransaction = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({
      date: -1,
    });

    // Total Income in last 60 days
    const incomeLast60Days = last60DaysIncomeTransaction.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // Expense in last 30 days
    const last30DaysExpenseTransaction = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    // Total Expense in last 30 days
    const expenseLast30Days = last30DaysExpenseTransaction.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // Last 5 Income Transactions
    const lastTransactions = [
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (transaction) => ({ ...transaction.toObject(), type: "Income" })
      ),
      ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (transaction) => ({ ...transaction.toObject(), type: "Expense" })
      ),
    ].sort((a, b) => b.date - a.date); // Sort by date descending

    res.status(200).json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransaction,
      },
      last30DaysExpense: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransaction,
      },
      recentTransactions: lastTransactions,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while fetching dashboard data",
      error: error.message,
    });
  }
};

// How aggregate works
// Sample Data:
// [
//     { userId: "u1", category: "Salary", amount: 5000 },
//     { userId: "u1", category: "Freelance", amount: 2000 },
//     { userId: "u1", category: "Salary", amount: 3000 },
//     { userId: "u2", category: "Salary", amount: 7000 }
//   ]

//   db.incomes.aggregate([
//     { $group: { _id: null, total: { $sum: "$amount" } } }
//   ]);

//   [ { _id: null, total: 17000 } ]

//   db.incomes.aggregate([
//     { $group: { _id: "$userId", total: { $sum: "$amount" } } }
//   ]);

//   [
//     { _id: "u1", total: 10000 },
//     { _id: "u2", total: 7000 }
//   ]
