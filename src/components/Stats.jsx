import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import { useSelector } from "react-redux";

const Stats = () => {
  const [totalBalance, setTotalBalance] = useState(0);
  const expenses = useSelector((state) => state.expense.expenses);
  const incomes = useSelector((state) => state.expense.incomes);

  function getBalance() {
    let balance = incomes - expenses;
    setTotalBalance(balance);
  }

  useEffect(() => {
    getBalance();
  }, [incomes, expenses]);

  return (
    <div className="w-[95%] mx-auto bg-red-200 rounded-xl mt-8 flex flex-col gap-8 items-center py-8 sm:flex-row sm:justify-evenly">
      <div className="flex flex-col gap-4">
        <p className="text-4xl sm:text-[3.5rem] font-semibold text-center">{`Balance is $ ${totalBalance}`}</p>
        <div className="flex flex-col items-center gap-1 bg-red-100 rounded-xl p-2">
          <span className="text-[2.5rem] sm:text-[3rem] font-bold">{`$ ${incomes}`}</span>
          <span className="text-sm sm:text-[1.4rem] text-neutral-700">
            Total Income
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 bg-red-100 rounded-xl p-2">
          <span className="text-[2.5rem] sm:text-[3rem] font-bold">{`$ ${expenses}`}</span>
          <span className="text-sm sm:text-[1.4rem] text-neutral-700">
            Total Expense
          </span>
        </div>
      </div>
      <div>
        <Chart />
      </div>
    </div>
  );
};

export default Stats;
