
import { saveTransaction, getTransactions } from './transactions.js';
import { renderDashboard } from './dashboard.js';
import { renderTransactionsList } from './list.js';

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
  renderTransactionsList();
});

window.navigateTo = function (section) {
  document.getElementById("dashboard-section").style.display = section === "dashboard" ? "block" : "none";
  document.getElementById("new-transaction-section").style.display = section === "new-transaction" ? "block" : "none";
  document.getElementById("list-transactions-section").style.display = section === "list-transactions" ? "block" : "none";

  if (section === "dashboard") renderDashboard();
  if (section === "list-transactions") renderTransactionsList();
};

document.getElementById("filter-type").addEventListener("change", renderTransactionsList);

window.addEventListener("DOMContentLoaded", () => {
  renderDashboard();
  renderTransactionsList();
});
