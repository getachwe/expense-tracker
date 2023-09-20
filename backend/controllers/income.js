const IncomeSchema = require("../models/incomeModel");

exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const income = IncomeSchema({
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
    await income.save();
    res.status(200).json({ message: " Income  Added" });
  } catch (error) {
    res.status(500).json({
      massage: "Server Error",
    });
  }
  console.log(income);
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  incomeSchema
    .findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ massage: "Income Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ massage: "Server Error" });
    });
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await IncomeSchema.find()
      .sort({
        createdAt: -1,
      })
      .exec();
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
