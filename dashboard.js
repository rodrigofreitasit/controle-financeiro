
const transactions = [
  { type: "entrada", amount: 3000 },
  { type: "saida", amount: 400, category: "Alimentação" },
  { type: "saida", amount: 250, category: "Transporte" },
  { type: "saida", amount: 100, category: "Lazer" },
  { type: "saida", amount: 50, category: "Saúde" }
];

function renderDashboard() {
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

  document.getElementById("chart-center-label").textContent = `Total: R$ ${total.toFixed(2)}`;

  const ctx = document.getElementById("pieChart").getContext("2d");

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: categories,
      datasets: [{
        data: values,
        backgroundColor: ["#f87171", "#60a5fa", "#fbbf24", "#34d399"]
      }]
    },
    options: {
      cutout: "70%",
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });

  const topList = document.querySelector(".top-categories ul");
  topList.innerHTML = categories.map((cat, i) => {
    const percent = ((values[i] / total) * 100).toFixed(1);
    return `<li><strong>${cat}</strong>: R$ ${values[i].toFixed(2)} (${percent}%)</li>`;
  }).join("");
}

renderDashboard();
