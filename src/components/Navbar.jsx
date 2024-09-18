import React, { useEffect } from "react";
import styles from "./Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { trueAddTransaction } from "../Store/Slice";
import Login from "./Login";
import FetchFirebase from "./FetchFirebase";
const Navbar = () => {
  const dispatch = useDispatch();

  function handleAddTransaction() {
    dispatch(trueAddTransaction());
  }

  return (
    <div className={styles.container}>
      <h1>Expense Tracker</h1>
      <button onClick={handleAddTransaction}>Add new Transaction</button>
      <Login />
      <FetchFirebase />
    </div>
  );
};

export default Navbar;
