import React, { useRef, useState } from "react";
import styles from "./AddExpense.module.css";
import { addTransaction, falseAddTransaction } from "../Store/Slice";
import { useDispatch } from "react-redux";

const AddExpense = () => {
  const dispatch = useDispatch();
  const descRef = useRef("");
  const amountRef = useRef("");
  const [selectedValue, setSelectedValue] = useState("income");
  function handleCloseTransaction() {
    dispatch(falseAddTransaction());
  }
  function handleRadioChange(selected) {
    setSelectedValue(selected);
    console.log(selected);
  }
  function handleAddTransaction(e) {
    e.preventDefault();
    console.log("clicked");

    const desc = descRef.current.value;
    const amount = amountRef.current.value;
    const type = selectedValue;
    // if (desc === "" || amount === "" || type === "") return;
    // if (amount < 0) return;
    dispatch(addTransaction({ desc, amount, type }));
    descRef.current.value = "";
    amountRef.current.value = "";
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>Add New Transaction</p>
        <button onClick={handleCloseTransaction}>X</button>
      </div>
      <div className={styles.desc}>
        <p>Enter Description</p>
        <input type="text" required ref={descRef} />
      </div>
      <div className={styles.desc}>
        <p>Enter Amount</p>
        <input type="text" required ref={amountRef} />
      </div>
      <div className={styles.containerButton}>
        <label>Income</label>
        <input
          type="radio"
          name="type"
          checked={selectedValue === "income"}
          onChange={() => handleRadioChange("income")}
        />
        <label>Expense</label>
        <input
          type="radio"
          name="type"
          checked={selectedValue === "expense"}
          onChange={() => handleRadioChange("expense")}
        />
      </div>
      <div className={styles.containerButton}>
        <button className={styles.subButton}>Clear</button>
        <button
          className={styles.subButton}
          onClick={(e) => handleAddTransaction(e)}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddExpense;
