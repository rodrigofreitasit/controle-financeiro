
import { getTransactions } from './transactions.js';

export function renderDashboard() {
  const transactions = getTransactions();
  let totalIncomes = 0;
  let totalExpenses = 0;
  const categoryTotals = {};

  transactions.forEach(tx => {
    const value = parseFloat(tx.amount);
    if (tx.type === "entrada") {
      totalIncomes += value;
    } else {
      totalExpenses += value;
      categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + value;
    }
  });

  const balance = totalIncomes - totalExpenses;
  document.getElementById("balance").textContent = `Saldo: R$ ${balance.toFixed(2)}`;
  document.getElementById("total-incomes").textContent = `Entradas: R$ ${totalIncomes.toFixed(2)}`;
  document.getElementById("total-expenses").textContent = `Saídas: R$ ${totalExpenses.toFixed(2)}`;

  const topList = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([cat, val]) => `<li>${cat}: R$ ${val.toFixed(2)}</li>`).join("");

  document.querySelector("#top-categories ul").innerHTML = topList;

  renderPieChart(categoryTotals);
}

let pie;

function renderPieChart(data) {
  const ctx = document.getElementById('pieChart').getContext('2d');
  if (pie) pie.destroy();
  pie = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(data),
      datasets: [{
        label: 'Gastos por Categoria',
        data: Object.values(data),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true
    }
  });
}
