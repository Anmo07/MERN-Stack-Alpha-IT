import { useState, useEffect } from "react";
import { X } from "lucide-react";

const CATEGORIES = [
  "Food",
  "Travel",
  "Shopping",
  "Bills",
  "Entertainment",
  "Health",
  "Education",
  "Other",
];

const PAYMENT_METHODS = [
  "Cash",
  "Credit Card",
  "Debit Card",
  "UPI",
  "Net Banking",
  "Other",
];

const ExpenseModal = ({
  isOpen,
  onClose,
  onSave,
  expenseToEdit,
  isSubmitting,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
    paymentMethod: "Cash",
    description: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (expenseToEdit) {
      setFormData({
        title: expenseToEdit.title || "",
        amount: expenseToEdit.amount || "",
        category: expenseToEdit.category || "Food",
        date: expenseToEdit.date
          ? expenseToEdit.date.split("T")[0]
          : new Date().toISOString().split("T")[0],
        paymentMethod: expenseToEdit.paymentMethod || "Cash",
        description: expenseToEdit.description || "",
      });
    } else {
      setFormData({
        title: "",
        amount: "",
        category: "Food",
        date: new Date().toISOString().split("T")[0],
        paymentMethod: "Cash",
        description: "",
      });
    }
    setErrors({});
  }, [expenseToEdit, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Expense title is required";
    }

    const numAmount = Number(formData.amount);
    if (!formData.amount || isNaN(numAmount) || numAmount <= 0) {
      newErrors.amount = "Enter a valid amount greater than 0";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (!formData.date) {
      newErrors.date = "Please select a valid date";
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = "Please select a payment method";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{expenseToEdit ? "Edit Expense" : "Add New Expense"}</h3>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="title">Expense Title *</label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="e.g. Grocery shopping, Electricity bill"
                className={`form-input ${errors.title ? "input-error" : ""}`}
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && (
                <span className="error-text">{errors.title}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="amount">Amount (₹) *</label>
              <input
                id="amount"
                name="amount"
                type="number"
                step="1"
                min="1"
                placeholder="Enter amount"
                className={`form-input ${errors.amount ? "input-error" : ""}`}
                value={formData.amount}
                onChange={handleChange}
              />
              {errors.amount && (
                <span className="error-text">{errors.amount}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                className={`form-select ${errors.category ? "input-error" : ""}`}
                value={formData.category}
                onChange={handleChange}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="error-text">{errors.category}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="date">Date *</label>
              <input
                id="date"
                name="date"
                type="date"
                className={`form-input ${errors.date ? "input-error" : ""}`}
                value={formData.date}
                onChange={handleChange}
              />
              {errors.date && <span className="error-text">{errors.date}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="paymentMethod">Payment Method *</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                className={`form-select ${errors.paymentMethod ? "input-error" : ""}`}
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                {PAYMENT_METHODS.map((pm) => (
                  <option key={pm} value={pm}>
                    {pm}
                  </option>
                ))}
              </select>
              {errors.paymentMethod && (
                <span className="error-text">{errors.paymentMethod}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description (Optional)</label>
              <textarea
                id="description"
                name="description"
                rows="3"
                placeholder="Add any extra notes or details..."
                className="form-textarea"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="spinner" />
              ) : expenseToEdit ? (
                "Update Expense"
              ) : (
                "Add Expense"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseModal;
