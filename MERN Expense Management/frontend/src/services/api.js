const API_BASE_URL = "/api";

const getAuthToken = () => {
  return localStorage.getItem("expense_token");
};

export const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers
  };

  if (config.body && typeof config.body === "object") {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("expense_token");
      localStorage.removeItem("expense_user");
    }
    const message = data.message || "An unexpected error occurred";
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

export const authAPI = {
  register: (userData) => apiRequest("/auth/register", { method: "POST", body: userData }),
  login: (credentials) => apiRequest("/auth/login", { method: "POST", body: credentials }),
  getProfile: () => apiRequest("/auth/me", { method: "GET" })
};

export const expenseAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.search) params.append("search", filters.search);
    if (filters.category && filters.category !== "All") params.append("category", filters.category);
    if (filters.paymentMethod && filters.paymentMethod !== "All") params.append("paymentMethod", filters.paymentMethod);
    if (filters.startDate) params.append("startDate", filters.startDate);
    if (filters.endDate) params.append("endDate", filters.endDate);
    if (filters.sortBy) params.append("sortBy", filters.sortBy);

    const queryString = params.toString() ? `?${params.toString()}` : "";
    return apiRequest(`/expenses${queryString}`, { method: "GET" });
  },
  getSummary: () => apiRequest("/expenses/summary", { method: "GET" }),
  getById: (id) => apiRequest(`/expenses/${id}`, { method: "GET" }),
  create: (data) => apiRequest("/expenses", { method: "POST", body: data }),
  update: (id, data) => apiRequest(`/expenses/${id}`, { method: "PUT", body: data }),
  delete: (id) => apiRequest(`/expenses/${id}`, { method: "DELETE" })
};
