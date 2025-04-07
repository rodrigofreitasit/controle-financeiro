
import { getTransactions } from './transactions.js';

export function renderDashboard() {
  const transactions = getTransactions();
  const incomes = transactions.filter(t => t.type === "entrada");
  const expenses = transactions.filter(t => t.type === "saida");

  const totalIncomes = incomes.reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = expenses.reduce((acc, t) => acc + t.amount, 0);
  const balance = totalIncomes - totalExpenses;

  document.getElementById("balance").textContent = `R$ ${balance.toFixed(2)}`;
  document.getElementById("total-incomes").textContent = `R$ ${totalIncomes.toFixed(2)}`;
  document.getElementById("total-expenses").textContent = `R$ ${totalExpenses.toFixed(2)}`;

  const categoryTotals = {};
  expenses.forEach(t => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });

  const categories = Object.keys(categoryTotals);
  const values = Object.values(categoryTotals);
  const total = values.reduce((acc, v) => acc + v, 0);

  const centerLabel = document.getElementById("chart-center-label");
  if (centerLabel) {
    centerLabel.textContent = `Total: R$ ${total.toFixed(2)}`;
  }

  const chartColors = ["#f87171", "#60a5fa", "#fbbf24", "#34d399", "#a78bfa", "#f472b6"];
  const ctx = document.getElementById("pieChart").getContext("2d");

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: categories,
      datasets: [{
        data: values,
        backgroundColor: chartColors
      }]
    },
    options: {
      cutout: "70%",
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  });

  const topList = document.querySelector("#top-categories ul");
  if (topList) {
    topList.innerHTML = categories.map((cat, i) => {
      const percent = ((values[i] / total) * 100).toFixed(1);
      const color = chartColors[i % chartColors.length];
      return `
        <li>
          <div class="category-label">
            <span class="color-dot" style="background-color: ${color}"></span>
            <span class="category-name">${cat}</span>
          </div>
          <div class="category-amount">R$ ${values[i].toFixed(2)} (${percent}%)</div>
        </li>
      `;
    }).join("");
  }
}
