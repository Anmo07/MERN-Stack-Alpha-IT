import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  PlusCircle,
  Download,
  Edit2,
  Trash2,
  Receipt,
  RotateCcw
} from "lucide-react";
import { expenseAPI } from "../services/api";

const CATEGORIES = [
  "All",
  "Food",
  "Travel",
  "Shopping",
  "Bills",
  "Entertainment",
  "Health",
  "Education",
  "Other"
];

const PAYMENT_METHODS = [
  "All",
  "Cash",
  "Credit Card",
  "Debit Card",
  "UPI",
  "Net Banking",
  "Other"
];

const Expenses = ({ onAddExpense, onEditExpense, onDeleteExpenseRequest }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    category: "All",
    paymentMethod: "All",
    startDate: "",
    endDate: "",
    sortBy: "date-desc"
  });

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await expenseAPI.getAll(filters);
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [filters.category, filters.paymentMethod, filters.startDate, filters.endDate, filters.sortBy]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchExpenses();
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      category: "All",
      paymentMethod: "All",
      startDate: "",
      endDate: "",
      sortBy: "date-desc"
    });
  };

  const exportCSV = () => {
    if (expenses.length === 0) return;

    const headers = ["Title", "Amount", "Category", "Date", "Payment Method", "Description"];
    const rows = expenses.map((exp) => [
      `"${exp.title.replace(/"/g, '""')}"`,
      Number(exp.amount).toFixed(2),
      `"${exp.category}"`,
      `"${new Date(exp.date).toISOString().split("T")[0]}"`,
      `"${exp.paymentMethod}"`,
      `"${(exp.description || "").replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `expenses_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalFilteredAmount = expenses.reduce((sum, item) => sum + Number(item.amount), 0);

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>Expenses Management</h1>
          <p>
            Showing {expenses.length} transaction{expenses.length !== 1 ? "s" : ""} · Total: ${totalFilteredAmount.toFixed(2)}
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button
            className="btn btn-secondary"
            onClick={exportCSV}
            disabled={expenses.length === 0}
            title="Download CSV report"
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>
          <button className="btn btn-primary" onClick={onAddExpense}>
            <PlusCircle size={18} />
            <span>Add Expense</span>
          </button>
        </div>
      </div>

      <div className="filter-bar">
        <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: "0.5rem" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search
              size={18}
              style={{
                position: "absolute",
                left: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-light)"
              }}
            />
            <input
              type="text"
              name="search"
              placeholder="Search by title or description..."
              className="form-input"
              style={{ paddingLeft: "2.3rem" }}
              value={filters.search}
              onChange={handleFilterChange}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-sm">
            Search
          </button>
        </form>

        <div className="filter-grid">
          <div>
            <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: "0.25rem" }}>
              CATEGORY
            </label>
            <select
              name="category"
              className="form-select"
              value={filters.category}
              onChange={handleFilterChange}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: "0.25rem" }}>
              PAYMENT METHOD
            </label>
            <select
              name="paymentMethod"
              className="form-select"
              value={filters.paymentMethod}
              onChange={handleFilterChange}
            >
              {PAYMENT_METHODS.map((pm) => (
                <option key={pm} value={pm}>
                  {pm}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: "0.25rem" }}>
              FROM DATE
            </label>
            <input
              type="date"
              name="startDate"
              className="form-input"
              value={filters.startDate}
              onChange={handleFilterChange}
            />
          </div>

          <div>
            <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: "0.25rem" }}>
              TO DATE
            </label>
            <input
              type="date"
              name="endDate"
              className="form-input"
              value={filters.endDate}
              onChange={handleFilterChange}
            />
          </div>

          <div>
            <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", display: "block", marginBottom: "0.25rem" }}>
              SORT BY
            </label>
            <select
              name="sortBy"
              className="form-select"
              value={filters.sortBy}
              onChange={handleFilterChange}
            >
              <option value="date-desc">Date: Newest First</option>
              <option value="date-asc">Date: Oldest First</option>
              <option value="amount-desc">Amount: Highest First</option>
              <option value="amount-asc">Amount: Lowest First</option>
            </select>
          </div>
        </div>

        <div className="filter-actions">
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--text-muted)", fontSize: "0.85rem" }}>
            <Filter size={16} />
            <span>Refine results using filters above</span>
          </div>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={resetFilters}
          >
            <RotateCcw size={14} />
            <span>Reset All Filters</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="spinner-primary" />
      ) : expenses.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <Receipt size={28} />
          </div>
          <h3>No expenses found</h3>
          <p>
            {filters.search || filters.category !== "All" || filters.paymentMethod !== "All" || filters.startDate || filters.endDate
              ? "No expenses matched your filter criteria. Try adjusting or resetting filters."
              : "You haven't recorded any expenses yet."}
          </p>
          {filters.search || filters.category !== "All" || filters.paymentMethod !== "All" || filters.startDate || filters.endDate ? (
            <button className="btn btn-secondary btn-sm" onClick={resetFilters}>
              Reset Filters
            </button>
          ) : (
            <button className="btn btn-primary btn-sm" onClick={onAddExpense}>
              <PlusCircle size={16} />
              <span>Add Your First Expense</span>
            </button>
          )}
        </div>
      ) : (
        <div className="table-container">
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Title & Description</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Payment Method</th>
                  <th style={{ textAlign: "right" }}>Amount</th>
                  <th style={{ textAlign: "center", width: "100px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense._id}>
                    <td>
                      <div style={{ fontWeight: 600, color: "var(--text-main)" }}>
                        {expense.title}
                      </div>
                      {expense.description && (
                        <div
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--text-muted)",
                            marginTop: "0.2rem",
                            maxWidth: "320px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                          }}
                        >
                          {expense.description}
                        </div>
                      )}
                    </td>
                    <td>
                      <span className={`badge badge-${expense.category.toLowerCase()}`}>
                        {expense.category}
                      </span>
                    </td>
                    <td>
                      {new Date(expense.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </td>
                    <td>
                      <span style={{ fontSize: "0.88rem", fontWeight: 500 }}>
                        {expense.paymentMethod}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }} className="amount-text">
                      ${Number(expense.amount).toFixed(2)}
                    </td>
                    <td>
                      <div className="action-buttons" style={{ justifyContent: "center" }}>
                        <button
                          className="icon-action-btn edit"
                          onClick={() => onEditExpense(expense)}
                          title="Edit expense"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          className="icon-action-btn delete"
                          onClick={() => onDeleteExpenseRequest(expense)}
                          title="Delete expense"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expenses;
