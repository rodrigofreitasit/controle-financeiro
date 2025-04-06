
export function saveTransaction(transaction) {
  const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

export function getTransactions() {
  return JSON.parse(localStorage.getItem("transactions") || "[]");
}
