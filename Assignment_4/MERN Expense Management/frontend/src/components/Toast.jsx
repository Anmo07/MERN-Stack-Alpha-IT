import { CheckCircle2, AlertCircle, X } from "lucide-react";

const Toast = ({ message, type = "success", onClose }) => {
  if (!message) return null;

  return (
    <div className="toast-container">
      <div className={`toast toast-${type}`}>
        {type === "success" ? (
          <CheckCircle2 size={18} color="#10b981" />
        ) : (
          <AlertCircle size={18} color="#ef4444" />
        )}
        <span>{message}</span>
        <button
          onClick={onClose}
          style={{ background: "none", border: "none", cursor: "pointer", marginLeft: "auto", display: "flex" }}
        >
          <X size={16} color="#94a3b8" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
