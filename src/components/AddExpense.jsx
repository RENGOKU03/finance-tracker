import React, { useRef, useState } from "react";
import { addTransaction, falseAddTransaction } from "../Store/Slice";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { useDispatch } from "react-redux";

const AddExpense = () => {
  const [selectedValue, setSelectedValue] = useState("income");
  const [bgColor, setBgColor] = useState("#70dede");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const descRef = useRef("");
  const amountRef = useRef("");

  const handleCloseTransaction = () => dispatch(falseAddTransaction());

  const handleRadioChange = (selected) => {
    setSelectedValue(selected);
    setBgColor(selected === "expense" ? "#ff7676" : "#70dede");
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    setError("");
    const desc = descRef.current.value;
    const amount = Number(amountRef.current.value);
    if (!desc || !amount || isNaN(amount)) return setError("Invalid Input");

    try {
      const data = {
        type: selectedValue,
        desc,
        amount,
        userId: auth.currentUser.uid,
        time: new Date().toLocaleString(),
      };
      await addDoc(collection(db, "transactions"), data);
      dispatch(addTransaction(data));
      handleCloseTransaction();
    } catch (err) {
      setError("Error adding transaction");
    }
  };

  return (
    <form
      className="fixed left-1/2 -translate-x-1/2 top-20 bg-white p-6 w-[550px] max-w-[95%] flex flex-col gap-6 rounded-xl shadow-xl z-10"
      style={{ backgroundColor: bgColor }}
      onSubmit={handleAddTransaction}
    >
      <div className="flex justify-between items-center">
        <p className="text-2xl font-semibold">Add Transaction</p>
        <button
          type="button"
          onClick={handleCloseTransaction}
          className="px-4 py-2 text-lg font-medium bg-teal-600 hover:bg-teal-800 text-white rounded shadow"
        >
          Close
        </button>
      </div>

      <div>
        <p className="text-xl font-medium mb-2">Description</p>
        <input
          type="text"
          ref={descRef}
          className="w-full p-2 text-lg rounded border-2 border-transparent hover:border-pink-200 outline-none"
        />
      </div>

      <div>
        <p className="text-xl font-medium mb-2">Amount</p>
        <input
          type="number"
          ref={amountRef}
          className="w-full p-2 text-lg rounded border-2 border-transparent hover:border-pink-200 outline-none"
        />
      </div>

      <div className="flex justify-center gap-4 mb-4">
        <label className="text-lg">
          <input
            type="radio"
            value="income"
            checked={selectedValue === "income"}
            onChange={() => handleRadioChange("income")}
            className="mr-2"
          />
          Income
        </label>
        <label className="text-lg">
          <input
            type="radio"
            value="expense"
            checked={selectedValue === "expense"}
            onChange={() => handleRadioChange("expense")}
            className="mr-2"
          />
          Expense
        </label>
      </div>

      <button
        type="submit"
        className="px-8 py-4 text-xl font-medium rounded bg-teal-500 hover:bg-teal-700 text-white"
      >
        Add Transaction
      </button>

      {error && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-h-[6rem] w-4/5 bg-yellow-100 border-2 border-black rounded flex justify-center items-center p-2 shadow-xl z-20">
          <div className="text-red-600 font-extrabold text-2xl text-center">
            {error}
          </div>
          <button
            type="button"
            onClick={() => setError("")}
            className="ml-4 px-6 py-3 text-lg bg-black text-white rounded hover:bg-white hover:text-black"
          >
            Close
          </button>
        </div>
      )}
    </form>
  );
};

export default AddExpense;
