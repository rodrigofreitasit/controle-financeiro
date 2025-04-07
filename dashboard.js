
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
  const percentages = values.map(v => ((v / total) * 100).toFixed(1));

  const canvas = document.getElementById("pieChart");
  const ctx = canvas.getContext("2d");

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: categories,
      datasets: [{
        data: values,
        backgroundColor: [
          "#f87171", "#60a5fa", "#fbbf24", "#34d399", "#a78bfa", "#f472b6"
        ]
      }]
    },
    options: {
      cutout: "70%",
      plugins: [{
        id: 'center-text',
        beforeDraw(chart) {
          const { width, height } = chart;
          const ctx = chart.ctx;
          ctx.save();

          const text = `Total: R$ ${total.toFixed(2)}`;
          let fontSize = Math.min(width, height) / 12;
          fontSize = Math.max(Math.min(fontSize, 24), 12);

          ctx.font = `${fontSize}px Inter`;
          ctx.textBaseline = "middle";
          ctx.textAlign = "center";
          ctx.fillStyle = '#4F46E5';

          const textX = width / 2;
          const textY = height / 2;

          ctx.clearRect(0, 0, width, height);
          chart.draw();
          ctx.fillText(text, textX, textY);
          ctx.restore();
        }
      }],
      responsive: true,
      maintainAspectRatio: false
    }
  });

  const topList = document.querySelector("#top-categories ul");
  topList.innerHTML = categories.map((cat, i) => `
    <li><strong>${cat}</strong>: R$ ${values[i].toFixed(2)} (${percentages[i]}%)</li>
  `).join("");
}
