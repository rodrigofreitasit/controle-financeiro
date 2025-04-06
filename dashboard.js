
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

  renderCategoryList(categoryTotals, totalExpenses);
  renderPieChart(categoryTotals, totalExpenses);
}

function renderCategoryList(data, total) {
  const container = document.querySelector("#top-categories ul");
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
  container.innerHTML = entries.map(([cat, val]) => {
    const percent = ((val / total) * 100).toFixed(1);
    return `<li><strong>${cat}</strong>: R$ ${val.toFixed(2)} (${percent}%)</li>`;
  }).join("");
}

let pie;

function renderPieChart(data, total) {
  const ctx = document.getElementById('pieChart').getContext('2d');
  if (pie) pie.destroy();
  pie = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(data),
      datasets: [{
        label: 'Gastos por Categoria',
        data: Object.values(data),
        borderWidth: 1
      }]
    },
    options: {
      cutout: '70%',
      plugins: {
        tooltip: {
          callbacks: {
            label: (ctx) => {
              let val = ctx.raw;
              let percent = ((val / total) * 100).toFixed(1);
              return `${ctx.label}: R$ ${val.toFixed(2)} (${percent}%)`;
            }
          }
        },
        legend: {
          display: false
        }
      }
    },
    plugins: [{
      id: 'center-text',
      beforeDraw(chart) {
        const { width } = chart;
        const { height } = chart;
        const ctx = chart.ctx;
        ctx.restore();
        const fontSize = Math.min(height, width) / 120;
        ctx.font = `${fontSize}em Inter`;
        ctx.textBaseline = "middle";

        const text = `Total: R$ ${total.toFixed(2)}`;
        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const textY = height / 2;
        ctx.fillStyle = '#4F46E5';
        ctx.fillText(text, textX, textY);
        ctx.save();
      }
    }]
  });
}
