import React, { useRef, useState } from "react";
import styles from "./AddExpense.module.css";
import { addTransaction, falseAddTransaction } from "../Store/Slice";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useDispatch } from "react-redux";

const AddExpense = () => {
  const [selectedValue, setSelectedValue] = useState("income");
  const [bgColor, setBgColor] = useState("#70dede");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const descRef = useRef("");
  const amountRef = useRef("");

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
    setError("");
    const desc = descRef.current.value;
    const type = selectedValue;
    let amount = amountRef.current.value;
    amount = parseFloat(amount);

    if (desc === "" || amount === "" || type === "")
      return setError("Please fill all fields");
    if (isNaN(amount) || amount < 0)
      return setError("Amount should be a Positve Number");
    addToFirebase(desc, type, amount);
    dispatch(addTransaction({ type, desc, amount }));
    descRef.current.value = "";
    amountRef.current.value = "";
  }

  async function addToFirebase(desc, type, amount) {
    try {
      await addDoc(collection(db, "expenses"), {
        desc: desc,
        type: type,
        amount: amount,
      });
      console.log("Added Successfully");
    } catch (e) {
      console.error(e);
    }
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
