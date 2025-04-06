
document.getElementById("transaction-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const amount = document.getElementById("amount").value;
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;
  const payment = document.getElementById("payment").value;
  const date = document.getElementById("date").value;
  const notes = document.getElementById("notes").value;

  const transaction = {
    amount,
    type,
    category,
    payment,
    date,
    notes
  };

  console.log("Transação salva:", transaction);

  document.getElementById("message").textContent = "Transação salva com sucesso!";
  document.getElementById("transaction-form").reset();
});
