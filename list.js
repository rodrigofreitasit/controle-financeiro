
import { getTransactions } from './transactions.js';

export function renderTransactionsList() {
  const filter = document.getElementById("filter-type").value;
  const listEl = document.getElementById("transactions-list");
  const transactions = getTransactions().filter(t => filter === "todas" || t.type === filter);

  listEl.innerHTML = transactions.map(tx => {
    return `
      <li>
        <strong>${tx.category}</strong> - R$ ${parseFloat(tx.amount).toFixed(2)}<br/>
        ${tx.type === "entrada" ? "Entrada" : "Saída"} | ${tx.payment} | ${tx.date}
        ${tx.notes ? `<br/><em>${tx.notes}</em>` : ""}
      </li>
    `;
  }).join("");
}
