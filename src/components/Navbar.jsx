import React from "react";
import styles from "./Navbar.module.css";
const Navbar = () => {
  return (
    <div className={styles.container}>
      <h1>Expense Tracker</h1>
      <button>Add new Transaction</button>
    </div>
  );
};

export default Navbar;
