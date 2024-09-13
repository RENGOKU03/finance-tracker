import React from "react";
import styles from "./Navbar.module.css";
import { useDispatch } from "react-redux";
import { trueAddTransaction } from "../Store/Slice";
const Navbar = () => {
  const dispatch = useDispatch();
  function handleAddTransaction() {
    dispatch(trueAddTransaction());
  }
  return (
    <div className={styles.container}>
      <h1>Expense Tracker</h1>
      <button onClick={handleAddTransaction}>Add new Transaction</button>
    </div>
  );
};

export default Navbar;
