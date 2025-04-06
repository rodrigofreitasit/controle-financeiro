
import { saveTransaction } from './transactions.js';
import { renderDashboard } from './dashboard.js';
import { renderTransactionsList } from './list.js';
import { toggleTheme, applySavedTheme } from './theme.js';

const categoryOptions = {
  entrada: ["Salário", "Adiantamento", "Reembolso", "Outros"],
  saida: ["Alimentação", "Transporte", "Lazer", "Saúde", "Outros"]
};

function updateCategoryOptions(type) {
  const select = document.getElementById("category");
  select.innerHTML = "";
  categoryOptions[type].forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
}

document.getElementById("type").addEventListener("change", function () {
  updateCategoryOptions(this.value);
});

document.getElementById("payment").addEventListener("change", function () {
  const isCredit = this.value === "credito";
  document.getElementById("installments-toggle").style.display = isCredit ? "block" : "none";
  document.getElementById("installments-group").style.display = "none";
});

document.getElementById("is-parceled").addEventListener("change", function () {
  document.getElementById("installments-group").style.display = this.checked ? "block" : "none";
});

document.getElementById("transaction-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;
  const payment = document.getElementById("payment").value;
  const date = document.getElementById("date").value;
  const notes = document.getElementById("notes").value;
  const isParceled = document.getElementById("is-parceled").checked;
  const installments = parseInt(document.getElementById("installments").value || "1");

  if (payment === "credito" && isParceled && installments > 1) {
    const valuePerInstallment = amount / installments;
    const baseDate = new Date(date);
    for (let i = 0; i < installments; i++) {
      const installmentDate = new Date(baseDate);
      installmentDate.setMonth(baseDate.getMonth() + i);
      const tx = {
        amount: valuePerInstallment,
        type,
        category,
        payment,
        date: installmentDate.toISOString().split("T")[0],
        notes: `${notes} (${i + 1}/${installments})`
      };
      saveTransaction(tx);
    }
  } else {
    const transaction = {
      amount,
      type,
      category,
      payment,
      date,
      notes
    };
    saveTransaction(transaction);
  }

  document.getElementById("message").textContent = "Transação salva com sucesso!";
  document.getElementById("transaction-form").reset();
  updateCategoryOptions("entrada");
  document.getElementById("installments-toggle").style.display = "none";
  document.getElementById("installments-group").style.display = "none";

  renderDashboard();
  renderTransactionsList();
});


window.navigateTo = function (section) {
  document.getElementById("dashboard-section").style.display = section === "dashboard" ? "block" : "none";
  document.getElementById("new-transaction-section").style.display = section === "new-transaction" ? "block" : "none";
  document.getElementById("list-transactions-section").style.display = section === "list-transactions" ? "block" : "none";
  document.getElementById("invoice-section").style.display = section === "invoice" ? "block" : "none";

  if (section === "dashboard") renderDashboard();
  if (section === "list-transactions") renderTransactionsList();
  if (section === "new-transaction") updateCategoryOptions(document.getElementById("type").value);
  if (section === "invoice") { setDefaultInvoiceMonth(); renderInvoice(); }
};


document.getElementById("toggle-theme").addEventListener("click", toggleTheme);

window.addEventListener("DOMContentLoaded", () => {
  applySavedTheme();
  renderDashboard();
  renderTransactionsList();
  updateCategoryOptions("entrada");
});

import { renderInvoice, setDefaultInvoiceMonth } from './invoice.js';

document.getElementById("invoice-month").addEventListener("change", renderInvoice);
