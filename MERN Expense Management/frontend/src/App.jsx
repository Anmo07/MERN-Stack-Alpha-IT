import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import ExpenseModal from "./components/ExpenseModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import { expenseAPI } from "./services/api";

const MainApp = () => {
  const { isAuthenticated, loading } = useAuth();
  const [authView, setAuthView] = useState("login");
  const [currentPage, setCurrentPage] = useState("dashboard");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [toast, setToast] = useState({ message: "", type: "success" });
  const [refreshKey, setRefreshKey] = useState(0);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: "", type: "success" });
    }, 4000);
  };

  const handleOpenAddModal = () => {
    setExpenseToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (expense) => {
    setExpenseToEdit(expense);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setExpenseToEdit(null);
  };

  const handleSaveExpense = async (formData) => {
    setIsSubmitting(true);
    try {
      if (expenseToEdit) {
        await expenseAPI.update(expenseToEdit._id, formData);
        showToast("Expense updated successfully!", "success");
      } else {
        await expenseAPI.create(formData);
        showToast("Expense added successfully!", "success");
      }
      setIsModalOpen(false);
      setExpenseToEdit(null);
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      showToast(err.message || "Failed to save expense", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenDeleteModal = (expense) => {
    setExpenseToDelete(expense);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setExpenseToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!expenseToDelete) return;
    setIsDeleting(true);
    try {
      await expenseAPI.delete(expenseToDelete._id);
      showToast("Expense deleted successfully!", "success");
      setIsDeleteModalOpen(false);
      setExpenseToDelete(null);
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      showToast(err.message || "Failed to delete expense", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <div className="spinner-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return authView === "login" ? (
      <Login onSwitchToRegister={() => setAuthView("register")} />
    ) : (
      <Register onSwitchToLogin={() => setAuthView("login")} />
    );
  }

  return (
    <div className="app-container">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main className="main-content">
        {currentPage === "dashboard" ? (
          <Dashboard
            key={refreshKey}
            onAddExpense={handleOpenAddModal}
            onViewAllExpenses={() => setCurrentPage("expenses")}
          />
        ) : (
          <Expenses
            key={refreshKey}
            onAddExpense={handleOpenAddModal}
            onEditExpense={handleOpenEditModal}
            onDeleteExpenseRequest={handleOpenDeleteModal}
          />
        )}
      </main>

      <ExpenseModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveExpense}
        expenseToEdit={expenseToEdit}
        isSubmitting={isSubmitting}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        expense={expenseToDelete}
        isDeleting={isDeleting}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "success" })}
      />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
};

export default App;
