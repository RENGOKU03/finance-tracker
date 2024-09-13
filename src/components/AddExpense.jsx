import React from "react";
import styles from "./AddExpense.module.css";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

const AddExpense = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>Add New Transaction</p>
        <button>X</button>
      </div>
      <div className={styles.desc}>
        <p>Enter Description</p>
        <input type="text" required />
      </div>
      <div className={styles.desc}>
        <p>Enter Amount</p>
        <input type="text" required pattern="\d{1,5}" />
      </div>
      <div className={styles.containerButton}>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          className={styles.radio}
        >
          <FormControlLabel value="income" control={<Radio />} label="Income" />
          <FormControlLabel
            value="expense"
            control={<Radio />}
            label="Expense"
          />
        </RadioGroup>
      </div>
      <div className={styles.containerButton}>
        <button className={styles.subButton}>Cancel</button>
        <button className={styles.subButton}>Add</button>
      </div>
    </div>
  );
};

export default AddExpense;
