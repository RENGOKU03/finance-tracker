import React, { useRef, useState } from "react";
import styles from "./AddExpense.module.css";
import { addTransaction, falseAddTransaction } from "../Store/Slice";
import { useDispatch } from "react-redux";

const AddExpense = () => {
  const dispatch = useDispatch();
  const descRef = useRef("");
  const amountRef = useRef("");
  const [selectedValue, setSelectedValue] = useState("income");
  const [bgColor, setBgColor] = useState("#70dede");
  const [error, setError] = useState("");
  function handleCloseTransaction() {
    dispatch(falseAddTransaction());
  }
  function handleRadioChange(selected) {
    setSelectedValue(selected);
    if (selected === "expense") setBgColor("#ff7676");
    else setBgColor("#70dede");
  }
  function handleAddTransaction(e) {
    e.preventDefault();
    console.log("clicked");
    setError("");
    const desc = descRef.current.value;
    const type = selectedValue;
    let amount = amountRef.current.value;
    amount = parseFloat(amount);

    if (desc === "" || amount === "" || type === "")
      return setError("Please fill all fields");
    if (isNaN(amount) || amount < 0)
      return setError("Amount should be a Positve Number");
    dispatch(addTransaction({ desc, amount, type }));
    descRef.current.value = "";
    amountRef.current.value = "";
  }
  return (
    <div className={styles.container} style={{ backgroundColor: bgColor }}>
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
        <button className={styles.subButton} onClick={handleCloseTransaction}>
          Cancel
        </button>
        <button
          className={styles.subButton}
          onClick={(e) => handleAddTransaction(e)}
        >
          Add
        </button>
      </div>

      {error && (
        <div className={styles.errordiv}>
          <p className={styles.error}>{error}</p>
          <button onClick={() => setError(false)}>Ok</button>
        </div>
      )}
    </div>
  );
};

export default AddExpense;
