import { useState } from "react";
import AddExpense from "./components/AddExpense";
import Navbar from "./components/Navbar";
import Stats from "./components/Stats";
import "./index.css";
import ExpensesTab from "./components/ExpensesTab";
import { useSelector } from "react-redux";

function App() {
  const addExpense = useSelector((state) => state.expense.addExpense);

  return (
    <div>
      <Navbar />

      {addExpense && <AddExpense />}

      <Stats />
      <ExpensesTab />
    </div>
  );
}

export default App;
