
import { getTransactions } from './transactions.js';

export function renderTransactionsList() {
  const transactions = getTransactions();
  const incomeBody = document.getElementById("incomes-table-body");
  const expenseBody = document.getElementById("expenses-table-body");

  incomeBody.innerHTML = "";
  expenseBody.innerHTML = "";

  const entries = transactions.filter(t => t.type === "entrada");
  const exits = transactions.filter(t => t.type === "saida");

  if (entries.length === 0) {
    incomeBody.innerHTML = "<tr><td colspan='3'>Nenhuma entrada encontrada</td></tr>";
  } else {
    entries.forEach(tx => {
      incomeBody.innerHTML += `
        <tr class="income-row">
          <td>${tx.category}</td>
          <td>R$ ${parseFloat(tx.amount).toFixed(2)}</td>
          <td>${tx.date}</td>
        </tr>
      `;
    });
  }

  if (exits.length === 0) {
    expenseBody.innerHTML = "<tr><td colspan='3'>Nenhuma saída encontrada</td></tr>";
  } else {
    exits.forEach(tx => {
      expenseBody.innerHTML += `
        <tr class="expense-row">
          <td>${tx.category}</td>
          <td>R$ ${parseFloat(tx.amount).toFixed(2)}</td>
          <td>${tx.date}</td>
        </tr>
      `;
    });
  }
}
