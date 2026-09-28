export const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: "Name is required"
    });
  }

  if (!email || typeof email !== "string" || !email.trim()) {
    return res.status(400).json({
      success: false,
      message: "Email is required"
    });
  }

  if (!email.includes("@") || !email.includes(".")) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format"
    });
  }

  if (!password || typeof password !== "string" || password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters long"
    });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || typeof email !== "string" || !email.trim()) {
    return res.status(400).json({
      success: false,
      message: "Email is required"
    });
  }

  if (!password || typeof password !== "string") {
    return res.status(400).json({
      success: false,
      message: "Password is required"
    });
  }

  next();
};

export const validateExpense = (req, res, next) => {
  const { title, amount, category, date, paymentMethod } = req.body;

  if (!title || typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: "Expense title is required"
    });
  }

  const numericAmount = Number(amount);
  if (amount === undefined || amount === null || isNaN(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({
      success: false,
      message: "Amount must be a valid positive number greater than 0"
    });
  }

  const validCategories = [
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Entertainment",
    "Health",
    "Education",
    "Other"
  ];
  if (!category || !validCategories.includes(category)) {
    return res.status(400).json({
      success: false,
      message: `Category is required and must be one of: ${validCategories.join(", ")}`
    });
  }

  if (!date || isNaN(new Date(date).getTime())) {
    return res.status(400).json({
      success: false,
      message: "A valid date is required"
    });
  }

  const validPaymentMethods = [
    "Cash",
    "Credit Card",
    "Debit Card",
    "UPI",
    "Net Banking",
    "Other"
  ];
  if (!paymentMethod || !validPaymentMethods.includes(paymentMethod)) {
    return res.status(400).json({
      success: false,
      message: `Payment method is required and must be one of: ${validPaymentMethods.join(", ")}`
    });
  }

  next();
};
