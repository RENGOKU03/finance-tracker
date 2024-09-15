import AddExpense from "./components/AddExpense";
import Navbar from "./components/Navbar";
import Stats from "./components/Stats";
import "./index.css";
import ExpensesTab from "./components/ExpensesTab";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/firebase";
import { useDispatch } from "react-redux";
import { addTransaction } from "./Store/Slice";

function App() {
  const addExpense = useSelector((state) => state.expense.addExpense);
  const expenseList = useSelector((state) => state.expense.expenseList);

  const dispatch = useDispatch();
  async function fetchData() {
    try {
      const querySnapshot = await getDocs(collection(db, "expenses"));
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });

      items.forEach((item) => {
        dispatch(
          addTransaction({
            type: item.type,
            desc: item.desc,
            amount: item.amount,
          })
        );
      });
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, [expenseList]);

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
