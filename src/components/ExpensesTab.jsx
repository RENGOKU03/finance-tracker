import React from "react";
import styles from "./ExpensesTab.module.css";
import { useSelector } from "react-redux";

const ExpensesTab = () => {
  const data = useSelector((state) => state.expense.expensesList);
  const expenses = data.filter((item) => item.type === "expense");
  const incomes = data.filter((item) => item.type === "income");
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
