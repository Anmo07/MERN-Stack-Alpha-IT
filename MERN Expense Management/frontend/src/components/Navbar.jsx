import { Wallet, LayoutDashboard, ReceiptText, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ currentPage, setCurrentPage }) => {
  const { user, logout } = useAuth();

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="nav-brand">
          <div className="brand-icon">
            <Wallet size={20} />
          </div>
          <span>ExpenseTracker</span>
        </div>

        <nav className="nav-links">
          <button
            className={`nav-btn ${currentPage === "dashboard" ? "active" : ""}`}
            onClick={() => setCurrentPage("dashboard")}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>
          <button
            className={`nav-btn ${currentPage === "expenses" ? "active" : ""}`}
            onClick={() => setCurrentPage("expenses")}
          >
            <ReceiptText size={18} />
            <span>Expenses</span>
          </button>
        </nav>

        <div className="nav-user-section">
          <div className="user-badge">
            <div className="user-avatar">{getInitial(user?.name)}</div>
            <span>{user?.name || "User"}</span>
          </div>
          <button className="logout-btn" onClick={logout} title="Sign Out">
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
