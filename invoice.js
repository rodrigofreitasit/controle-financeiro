
import { getTransactions } from './transactions.js';

export function renderInvoice() {
  const monthInput = document.getElementById("invoice-month");
  const selectedMonth = monthInput.value;
  const list = document.getElementById("invoice-list");
  const totalBox = document.getElementById("invoice-total");

  if (!selectedMonth) {
    list.innerHTML = "<li style='padding: 10px;'>Selecione um mês para visualizar a fatura.</li>";
    totalBox.textContent = "R$ 0,00";
    return;
  }

  const [year, month] = selectedMonth.split("-").map(Number);
  const transactions = getTransactions();

  const filtered = transactions.filter(tx => {
    const date = new Date(tx.date);
    return tx.payment === "credito" &&
           date.getFullYear() === year &&
           date.getMonth() + 1 === month;
  });

  let total = 0;
  const itemsHTML = filtered.map(tx => {
    total += tx.amount;
    return `
      <li>
        <strong>${tx.category}</strong> - R$ ${tx.amount.toFixed(2)}<br/>
        ${tx.notes || "Sem observação"} | ${tx.date}
      </li>
    `;
  }).join("");

  list.innerHTML = itemsHTML || "<li style='padding: 10px;'>Nenhuma transação com crédito neste mês.</li>";
  totalBox.textContent = `R$ ${total.toFixed(2)}`;
}

export function setDefaultInvoiceMonth() {
  const monthInput = document.getElementById("invoice-month");
  if (!monthInput.value) {
    const today = new Date();
    const month = today.toISOString().slice(0, 7); // yyyy-mm
    monthInput.value = month;
  }
}
