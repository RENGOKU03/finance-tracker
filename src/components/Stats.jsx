import React, { useEffect, useState } from "react";
import styles from "./Stats.module.css";
import Chart from "./Chart";
import { useSelector } from "react-redux";
const Stats = () => {
  const [totalBalance, setTotalBalance] = useState(0);
  const expenses = useSelector((state) => state.expense.expenses);
  const incomes = useSelector((state) => state.expense.incomes);
  function getBalance() {
    let balance = incomes - expenses;
    setTotalBalance(balance);
  }
  useEffect(() => {
    getBalance();
  }, [incomes, expenses]);
  return (
    <div className={styles.container}>
      <div className={styles.statContainer}>
        <p className={styles.balance}>{`Balance is $ ${totalBalance}`}</p>
        <div className={styles.total}>
          <span>{`$ ${incomes}`}</span>
          <span>Total Income</span>
        </div>
        <div className={styles.total}>
          <span>{`$ ${expenses}`}</span>
          <span>Total Expense</span>
        </div>
      </div>
      <div>
        <Chart />
      </div>
    </div>
  );
};

export default Stats;
