
import { saveTransaction, getTransactions } from './transactions.js';
import { renderDashboard } from './dashboard.js';

document.getElementById("transaction-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const transaction = {
    amount: parseFloat(document.getElementById("amount").value),
    type: document.getElementById("type").value,
    category: document.getElementById("category").value,
    payment: document.getElementById("payment").value,
    date: document.getElementById("date").value,
    notes: document.getElementById("notes").value
  };

  saveTransaction(transaction);

  document.getElementById("message").textContent = "Transação salva com sucesso!";
  document.getElementById("transaction-form").reset();

  renderDashboard();
});

window.navigateTo = function (section) {
  document.getElementById("dashboard-section").style.display = section === "dashboard" ? "block" : "none";
  document.getElementById("new-transaction-section").style.display = section === "new-transaction" ? "block" : "none";
};

window.addEventListener("DOMContentLoaded", () => {
  renderDashboard();
});
