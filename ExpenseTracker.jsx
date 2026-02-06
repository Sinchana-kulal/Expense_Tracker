import { useState } from "react";
import "./App.css";
function ExpenseTracker() {
  const [transactions, setTransactions] = useState([
    { id: 1, text: "Salary", amount: 5000, type: "Income" },
    { id: 2, text: "Snacks", amount: 200, type: "Expense" },
  ]);

  const [inputText, setInputText] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [inputType, setInputType] = useState("Income");

  function handleAdd() {
    if (!inputText || !inputAmount) return; 

    const newTransaction = {
      id: Date.now(),
      text: inputText,
      amount: parseFloat(inputAmount), 
      type: inputType,
    };

    setTransactions([...transactions, newTransaction]);

    setInputText("");
    setInputAmount("");
  }


  function handleDelete(id) {
    setTransactions(transactions.filter((t) => t.id !== id));
  }

  // Calculate Total Income
  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((total, t) => total + t.amount, 0);

  // Calculate Total Expense
  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((total, t) => total + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="tracker">
      <h1>Expense Tracker</h1>

      <div className="summary-box">
        <h2>Balance: ₹{balance}</h2>
        <div className="stats">
          <p style={{ color: "green" }}>Income: ₹{totalIncome}</p>
          <p style={{ color: "red" }}>Expense: ₹{totalExpense}</p>
        </div>
      </div>

      <div className="input-group">
        <input
          type="text"
          placeholder="Description (e.g. Salary)"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={inputAmount}
          onChange={(e) => setInputAmount(e.target.value)}
        />
        <select value={inputType} onChange={(e) => setInputType(e.target.value)}>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <button onClick={handleAdd} className="add-btn">Add Transaction</button>
      </div>

      <h3>History</h3>
      <ul className="list-container">
        {transactions.map((t) => (
          <li key={t.id} className={`transaction-row ${t.type}`}>
            <span>{t.text}</span>
            <span>₹{t.amount}</span>
            <button 
                className="delete-btn" 
                onClick={() => handleDelete(t.id)}
            >
                X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseTracker;