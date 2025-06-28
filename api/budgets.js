import { API } from '../config'; // Make sure this points to your base URL

// 🔐 Helper to send token in headers
const getAuthHeaders = (token) => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

// 🔹 GET all budgets
export async function getBudgets(token) {
  const res = await fetch(`${API}/api/budgets`, getAuthHeaders(token));
  return res.json();
}

// 🔹 GET budget status (optional for Dashboard)
export async function getBudgetStatus(token) {
  const res = await fetch(`${API}/api/budgets/status`, getAuthHeaders(token));
  return res.json();
}

// 🔹 POST create new budget
export async function addBudget(token, data) {
  const res = await fetch(`${API}/api/budgets`, {
    method: 'POST',
    ...getAuthHeaders(token),
    body: JSON.stringify(data),
  });
  return res.json();
}

// 🔹 PUT update existing budget
export async function updateBudget(token, id, data) {
  const res = await fetch(`${API}/api/budgets/${id}`, {
    method: 'PUT',
    ...getAuthHeaders(token),
    body: JSON.stringify(data),
  });
  return res.json();
}

// 🔹 DELETE a budget
export async function deleteBudget(token, id) {
  const res = await fetch(`${API}/api/budgets/${id}`, {
    method: 'DELETE',
    ...getAuthHeaders(token),
  });
  return res.json();
}

// 🔹 CSV Export (not for React Native directly, usually handled via Web)
export function exportBudgetsCSV(token) {
  // Not applicable in React Native browser context
  console.warn("CSV export is not supported in React Native.");
}
