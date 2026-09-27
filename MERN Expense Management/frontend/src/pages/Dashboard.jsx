import { useState, useEffect } from "react";
import {
  DollarSign,
  TrendingUp,
  Receipt,
  Calendar,
  PlusCircle,
  ArrowRight,
  PieChart,
  CreditCard
} from "lucide-react";
import { expenseAPI } from "../services/api";

const CATEGORY_COLORS = {
  Food: "#ea580c",
  Travel: "#0284c7",
  Shopping: "#9333ea",
  Bills: "#d97706",
  Entertainment: "#db2777",
  Health: "#16a34a",
  Education: "#4f46e5",
  Other: "#64748b"
};

const Dashboard = ({ onAddExpense, onViewAllExpenses }) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSummary = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await expenseAPI.getSummary();
      setSummary(res.data);
    } catch (err) {
      setError(err.message || "Failed to load dashboard statistics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  if (loading) {
    return <div className="spinner-primary" />;
  }

  if (error) {
    return (
      <div className="empty-state">
        <h3>Could not load dashboard</h3>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={fetchSummary}>
          Try Again
        </button>
      </div>
    );
  }

  const {
    totalAmount = 0,
    totalCount = 0,
    currentMonthSpending = 0,
    currentMonthCount = 0,
    categorySpending = [],
    paymentMethodSpending = [],
    recentExpenses = []
  } = summary || {};

  const currentMonthName = new Date().toLocaleString("default", { month: "long" });

  return (
    <div>
      <div className="page-header">
        <div className="page-title">
          <h1>Financial Dashboard</h1>
          <p>Real-time overview of your spending and budgeting</p>
        </div>
        <button className="btn btn-primary" onClick={onAddExpense}>
          <PlusCircle size={18} />
          <span>Add Expense</span>
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <span>Total Spent</span>
            <h2>${Number(totalAmount).toFixed(2)}</h2>
          </div>
          <div className="stat-icon" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>
            <DollarSign size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span>Total Transactions</span>
            <h2>{totalCount}</h2>
          </div>
          <div className="stat-icon" style={{ background: "#ecfdf5", color: "#10b981" }}>
            <Receipt size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span>{currentMonthName} Spending</span>
            <h2>${Number(currentMonthSpending).toFixed(2)}</h2>
          </div>
          <div className="stat-icon" style={{ background: "#fff7ed", color: "#ea580c" }}>
            <Calendar size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span>{currentMonthName} Count</span>
            <h2>{currentMonthCount}</h2>
          </div>
          <div className="stat-icon" style={{ background: "#f5f3ff", color: "#8b5cf6" }}>
            <TrendingUp size={24} />
          </div>
        </div>
      </div>

      <div className="dashboard-split">
        <div className="content-card">
          <div className="content-card-header">
            <h3>Recent Expenses</h3>
            {recentExpenses.length > 0 && (
              <button
                className="btn btn-outline btn-sm"
                onClick={onViewAllExpenses}
              >
                <span>View All</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>

          {recentExpenses.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <Receipt size={28} />
              </div>
              <h3>No expenses recorded</h3>
              <p>You haven't recorded any expenses yet. Start by clicking Add Expense.</p>
              <button className="btn btn-primary btn-sm" onClick={onAddExpense}>
                <PlusCircle size={16} />
                <span>Add Your First Expense</span>
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Payment</th>
                    <th style={{ textAlign: "right" }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentExpenses.map((exp) => (
                    <tr key={exp._id}>
                      <td style={{ fontWeight: 600 }}>{exp.title}</td>
                      <td>
                        <span className={`badge badge-${exp.category.toLowerCase()}`}>
                          {exp.category}
                        </span>
                      </td>
                      <td>
                        {new Date(exp.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </td>
                      <td>{exp.paymentMethod}</td>
                      <td style={{ textAlign: "right" }} className="amount-text">
                        ${Number(exp.amount).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="content-card">
            <div className="content-card-header">
              <h3>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  <PieChart size={18} color="var(--primary)" />
                  Category Breakdown
                </span>
              </h3>
            </div>

            {categorySpending.length === 0 ? (
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", textAlign: "center", padding: "1.5rem 0" }}>
                No category data available
              </p>
            ) : (
              <div className="category-bar-list">
                {categorySpending.map((cat) => {
                  const percentage = totalAmount > 0 ? ((cat.total / totalAmount) * 100).toFixed(1) : 0;
                  const color = CATEGORY_COLORS[cat.category] || "#64748b";
                  return (
                    <div key={cat.category} className="category-bar-item">
                      <div className="category-bar-header">
                        <span>{cat.category} ({cat.count})</span>
                        <span>${Number(cat.total).toFixed(2)} ({percentage}%)</span>
                      </div>
                      <div className="category-track">
                        <div
                          className="category-fill"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: color
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="content-card">
            <div className="content-card-header">
              <h3>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  <CreditCard size={18} color="var(--primary)" />
                  Payment Methods
                </span>
              </h3>
            </div>

            {paymentMethodSpending.length === 0 ? (
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", textAlign: "center", padding: "1.5rem 0" }}>
                No payment data available
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {paymentMethodSpending.map((pm) => (
                  <div
                    key={pm.paymentMethod}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.5rem 0",
                      borderBottom: "1px solid var(--border)",
                      fontSize: "0.9rem"
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>{pm.paymentMethod}</span>
                    <span style={{ color: "var(--text-muted)" }}>
                      ${Number(pm.total).toFixed(2)} ({pm.count})
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
