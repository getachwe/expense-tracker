const ExpenseSchema = require("../models/expenseModel");

exports.addExpene = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const expense = ExpenseSchema({
    title,
    amount,
    category,
    description,
    date,
  });
  try {
    if (!title || !category || !description) {
      return res.status(400).json({ massage: "All fields are required" });
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ massage: "Amount must be a positive number" });
    }
    await expense.save();
    res.status(200).json({ message: " Expense  Added" });
  } catch (error) {
    res.status(500).json({
      massage: "Server Error",
    });
  }
  console.log(expense);
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  ExpenseSchema.findByIdAndDelete(id)
    .then((expense) => {
      res.status(200).json({ massage: "Expense Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ massage: "Server Error" });
    });
};

exports.getexpenses = async (req, res) => {
  try {
    const expenses = await ExpenseSchema.find()
      .sort({
        createdAt: -1,
      })
      .exec();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
