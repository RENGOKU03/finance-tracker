import React from "react";
import styles from "./Stats.module.css";
import Chart from "./Chart";
const Stats = () => {
  return (
    <div className={styles.container}>
      <div className={styles.statContainer}>
        <p className={styles.balance}>Balance is $ 7341</p>
        <div className={styles.total}>
          <span>$12334</span>
          <span>Total Income</span>
        </div>
        <div className={styles.total}>
          <span>$12334</span>
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
