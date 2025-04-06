
import { getTransactions } from './transactions.js';

const categoryData = {
  "Alimentação": { color: "#ef4444", icon: "🍽️" },
  "Transporte": { color: "#0ea5e9", icon: "🚗" },
  "Lazer": { color: "#f59e0b", icon: "🎮" },
  "Saúde": { color: "#10b981", icon: "🩺" },
  "Casa": { color: "#3b82f6", icon: "🏠" },
  "Educação": { color: "#8b5cf6", icon: "📘" },
  "Outros": { color: "#6b7280", icon: "📦" },
  "Salário": { color: "#22c55e", icon: "💰" },
  "Adiantamento": { color: "#4ade80", icon: "💵" },
  "Reembolso": { color: "#2dd4bf", icon: "♻️" }
};

export function renderTransactionsList() {
  const transactions = getTransactions();
  const incomes = transactions.filter(t => t.type === "entrada");
  const expenses = transactions.filter(t => t.type === "saida");

  const incomeGroup = groupByCategory(incomes);
  const expenseGroup = groupByCategory(expenses);

  document.getElementById("incomes-table-body").innerHTML = renderCategoryCards(incomeGroup, "entrada");
  document.getElementById("expenses-table-body").innerHTML = renderCategoryCards(expenseGroup, "saida");
}

function groupByCategory(transactions) {
  return transactions.reduce((acc, tx) => {
    if (!acc[tx.category]) acc[tx.category] = [];
    acc[tx.category].push(tx);
    return acc;
  }, {});
}

function renderCategoryCards(grouped, type) {
  if (Object.keys(grouped).length === 0) {
    return `<tr><td colspan="3">Nenhuma transação encontrada</td></tr>`;
  }

  return Object.entries(grouped).map(([cat, items]) => {
    const { color, icon } = categoryData[cat] || { color: "#d1d5db", icon: "❔" };
    const rows = items.map(tx => `
      <div class="tx-item">
        <span class="tx-desc">${tx.notes || "Sem descrição"}</span>
        <span class="tx-value">R$ ${parseFloat(tx.amount).toFixed(2)}</span>
        <span class="tx-date">${tx.date}</span>
      </div>
    `).join("");

    return `
      <tr>
        <td colspan="3">
          <div class="category-card ${type}">
            <div class="card-header">
              <span class="icon" style="background:${color}">${icon}</span>
              <span class="category-name">${cat}</span>
            </div>
            <div class="card-body">${rows}</div>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}
