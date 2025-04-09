import { getTransactions } from './transactions.js';

let chart;

export function renderHistory() {
  const section = document.getElementById("history-section");
  const list = document.getElementById("history-list");
  const summary = document.getElementById("history-summary");
  const canvas = document.getElementById("history-chart");
  const transactions = getTransactions();

  const grouped = {};

  transactions.forEach(t => {
    const date = new Date(t.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!grouped[monthKey]) {
      grouped[monthKey] = [];
    }
    grouped[monthKey].push(t);
  });

  const months = Object.keys(grouped).sort().reverse();
  list.innerHTML = months.map(month => {
    const label = new Date(month + '-01').toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    return `<button class="month-btn" data-month="${month}">${label}</button>`;
  }).join("");

  list.querySelectorAll(".month-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const month = btn.dataset.month;
      const data = grouped[month];

      const totalIncomes = data.filter(t => t.type === "entrada").reduce((acc, t) => acc + t.amount, 0);
      const totalExpenses = data.filter(t => t.type === "saida").reduce((acc, t) => acc + t.amount, 0);
      const balance = totalIncomes - totalExpenses;

      summary.innerHTML = `
        <div class="row-cards">
          <div class="card"><div class="card-title">Entradas</div><div class="card-content">R$ ${totalIncomes.toFixed(2)}</div></div>
          <div class="card"><div class="card-title">Saídas</div><div class="card-content">R$ ${totalExpenses.toFixed(2)}</div></div>
          <div class="card"><div class="card-title">Saldo</div><div class="card-content">R$ ${balance.toFixed(2)}</div></div>
        </div>
      `;

      if (chart) chart.destroy();
      const ctx = canvas.getContext("2d");
      chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Entradas", "Saídas"],
          datasets: [{
            label: "R$",
            data: [totalIncomes, totalExpenses],
            backgroundColor: ["#34d399", "#f87171"]
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  });
}
