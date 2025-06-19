import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ExpensesTab = () => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const data = useSelector((state) => state.expense.expensesList);

  useEffect(() => {
    const expenses = data.filter((item) => item.type === "expense");
    const incomes = data.filter((item) => item.type === "income");
    setExpenses(expenses);
    setIncomes(incomes);
  }, [data]);

  const renderItems = (items, bgColor) =>
    items.map((item, index) => (
      <div
        key={index}
        className={`flex justify-between items-center mb-2 p-4 gap-4 rounded-xl ${bgColor}`}
      >
        <p className="text-xl font-medium text-white break-words">
          {item.desc}
        </p>
        <p className="text-xl font-medium text-white">{item.amount}</p>
      </div>
    ));

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-[95%] mx-auto">
      <div className="w-full md:w-1/2">
        <p className="text-3xl font-extrabold text-center my-4">Expense</p>
        {renderItems(expenses, "bg-red-500")}
      </div>
      <div className="w-full md:w-1/2">
        <p className="text-3xl font-extrabold text-center my-4">Income</p>
        {renderItems(incomes, "bg-teal-600")}
      </div>
    </div>
  );
};

export default ExpensesTab;
