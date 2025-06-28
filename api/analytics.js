// // api/analytics.js
// import { API } from '../config'; // your base URL


// const getAuthHeaders = (token) => {
//   console.log('Sending token:', token); // ✅ Add this
//   return {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//   };
// };


// // 🔹 1. Get summary (optional)
// export async function getSummary(token) {
//   const res = await fetch(`${API}/api/analytics/summary`, getAuthHeaders(token));
//   return await res.json();
// }

// // 🔹 2. Get category analytics (for Pie Chart)
// export async function getCategoryAnalytics(token) {
//   const res = await fetch(`${API}/api/analytics/category`, getAuthHeaders(token));
//   return await res.json();
// }

// // 🔹 3. Get trends (for Line Chart)
// export async function getTrends(token) {
//   const res = await fetch(`${API}/api/analytics/trends`, getAuthHeaders(token));
//   return await res.json();
// }

// // 🔹 4. Get income vs expense (for Bar Chart)
// export async function getIncomeVsExpense(token) {
//   const res = await fetch(`${API}/api/analytics/income-vs-expense`, getAuthHeaders(token));
//   return await res.json();
// }

// // 🔹 5. Get budgets (for status list)
// export async function getBudgets(token) {
//   const res = await fetch(`${API}/api/budgets`, getAuthHeaders(token));
//   return await res.json();
// }


// api/analytics.js
import { API } from '../config';

// 🔹 Helper to add Authorization headers
const getAuthHeaders = (token) => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

// 🔹 1. Get Summary (optional)
export async function getSummary(token) {
  const res = await fetch(`${API}/api/analytics/summary`, getAuthHeaders(token));
  return res.json();
}

// 🔹 2. Get Category Analytics (Pie Chart)
export async function getCategoryAnalytics(token) {
  const res = await fetch(`${API}/api/analytics/category`, getAuthHeaders(token));
  return res.json();
}

// 🔹 3. Get Income vs Expense (Bar Chart)
export async function getIncomeVsExpense(token) {
  const res = await fetch(`${API}/api/analytics/income-vs-expense`, getAuthHeaders(token));
  return res.json();
}

// 🔹 4. Get Trends (Line Chart)
export async function getTrends(token) {
  const res = await fetch(`${API}/api/analytics/trends`, getAuthHeaders(token));
  return res.json();
}

// 🔹 5. Get Budgets (Budget Overview List)
export async function getBudgets(token) {
  const res = await fetch(`${API}/api/budgets`, getAuthHeaders(token));
  return res.json();
}
