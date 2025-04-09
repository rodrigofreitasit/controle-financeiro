import { renderDashboard } from './dashboard.js';
import { renderTransactions, saveTransaction } from './transactions.js';
import { renderInvoice } from './invoice.js';
import { renderList } from './list.js';
import { setupThemeToggle } from './theme.js';
import { renderHistory } from './history.js';

function hideAllSections() {
  document.querySelectorAll(".container").forEach(sec => sec.style.display = "none");
}

function navigateTo(section) {
  hideAllSections();
  document.getElementById(section + "-section").style.display = "block";

  if (section === "dashboard") renderDashboard();
  if (section === "list-transactions") renderList();
  if (section === "invoice") renderInvoice();
  if (section === "history") renderHistory();
}

document.addEventListener("DOMContentLoaded", () => {
  navigateTo("dashboard");
  renderTransactions();
  setupThemeToggle();

  document.getElementById("transaction-form")?.addEventListener("submit", saveTransaction);
});
