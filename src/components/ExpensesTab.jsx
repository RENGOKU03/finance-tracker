import React, { useEffect, useState } from "react";
import styles from "./ExpensesTab.module.css";
import { useSelector } from "react-redux";

const ExpensesTab = () => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const data = useSelector((state) => state.expense.expensesList);

  function getDataFromRedux() {
    const expenses = data.filter((item) => item.type === "expense");
    const incomes = data.filter((item) => item.type === "income");
    setExpenses(expenses);
    setIncomes(incomes);
  }

  useEffect(() => {
    getDataFromRedux();
  }, [data]);
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <p className={styles.heading}>Expense</p>
        {expenses &&
          expenses.map((item, index) =>
            item.type === "expense" ? (
              <div
                className={`${styles.listContainer} ${styles.expense}`}
                key={index}
              >
                <p>{item.desc}</p>
                <p>{item.amount}</p>
              </div>
            ) : null
          )}
      </div>
      <div className={styles.main}>
        <p className={styles.heading}>Income</p>
        {incomes &&
          incomes.map((item, index) =>
            item.type === "income" ? (
              <div
                className={`${styles.listContainer} ${styles.income}`}
                key={index}
              >
                <p>{item.desc}</p>
                <p>{item.amount}</p>
              </div>
            ) : null
          )}
      </div>
    </div>
  );
};

export default ExpensesTab;
