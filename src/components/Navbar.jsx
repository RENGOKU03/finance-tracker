import React from "react";
import { useDispatch } from "react-redux";
import { trueAddTransaction } from "../Store/Slice";
import Login from "./Login";
import FetchFirebase from "./FetchFirebase";

const Navbar = () => {
  const dispatch = useDispatch();

  function handleAddTransaction() {
    dispatch(trueAddTransaction());
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4 overflow-hidden sm:text-center md:flex-row md:justify-evenly md:items-center">
      <h1 className="text-[3.5rem] sm:text-[5rem] font-bold whitespace-nowrap">
        Expense Tracker
      </h1>
      <button
        onClick={handleAddTransaction}
        className="px-4 py-2 text-xl sm:text-2xl md:text-[1.8rem] lg:text-[2rem] font-medium rounded bg-teal-300 text-black shadow-lg hover:bg-teal-600 hover:text-white transition"
      >
        Add new Transaction
      </button>
      <Login />
      <FetchFirebase />
    </div>
  );
};

export default Navbar;
